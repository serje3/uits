from typing import Optional, List

import pdfplumber
from django.core.files.uploadedfile import InMemoryUploadedFile

from department.employee.schedule.pydantic_models import LessonTimes, LessonWeekNumbers


def parse_schedule(in_memory: InMemoryUploadedFile):
    table = __extract_table(in_memory)
    parsed_data = __parse_table(table)
    print(parsed_data)
    return parsed_data


def __extract_table(in_memory: InMemoryUploadedFile) -> Optional[List[List[Optional[str]]]]:
    with pdfplumber.open(in_memory.file) as pdf:
        for page in pdf.pages:
            table = page.extract_table()

    return table


def __parse_table(table: Optional[List[List[Optional[str]]]]):
    timing_array = table[0][1:]
    data = __connect_lesson_timing(table[1:], timing_array)
    return data


def __connect_lesson_timing(table, timings) -> dict:
    data = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {}
    }
    day = None
    for row in table:
        inversed_day = row[0]
        is_subtable = inversed_day is None
        day = inversed_day[::-1] if not is_subtable else day
        lessons = row[1:]
        # print(day, lessons)
        for i in range(len(lessons)):
            if (is_subtable and lessons[i] is None) or lessons[i] == '':
                continue
            elif not is_subtable and lessons[i] is None:
                lesson = lessons[i - 1]
            else:
                lesson = lessons[i]
            lesson_time = LessonTimes.from_name(timings[i]).value
            lesson_week_number = LessonWeekNumbers.from_name(day).value
            # print("\t\t\t", lesson_week_number, lesson_time)
            timing = data[lesson_week_number].get(lesson_time, None)
            if timing is None:
                data[lesson_week_number][lesson_time] = []
            parsed_lesson = __parse_text(lesson)
            data[lesson_week_number][lesson_time].append(parsed_lesson)
    return data


def __parse_text(text: str, data=None):
    if data is None:
        data = []

    if len(text) == 0:
        return None
    text = text.replace("\n", " ")
    start_cor = text.index('[')
    end_cor = text.index(']')
    date = text[start_cor + 1:end_cor]
    lesson = text[:start_cor].strip().split('. ')
    data.append({
        "lesson": __parse_lesson(lesson),
        "date": __parse_date(date),
    })
    if len(text[end_cor:]) < 5:
        return data
    else:

        return __parse_text(text[end_cor + 1:].strip(), data)


def __parse_lesson(lesson):
    group = lesson[0]
    name = lesson[1]
    lesson_type = lesson[2]
    extra = __parse_extra(lesson[3:])
    return {
        "group": group,
        "name": name,
        "type": lesson_type,
        "extra": extra,
    }


def __parse_extra(raw_extra):
    extra = {}
    for item in raw_extra:
        item = item.replace('.', '').strip()
        if "(" in item and ")" in item and item[item.index("(") + 1].isupper():
            extra['subgroup'] = item
            continue
        else:
            extra["cabinet"] = item
    return extra


def __parse_date(raw_date: str):
    date_list: List[str] = [elem.strip() for elem in raw_date.split(',')]
    dates = []
    for date in date_list:
        date = (date.encode("utf-8", errors="replace").decode("utf-8", errors="replace")
                .replace("\x00", ""))
        period = False
        alternatively = False
        if "к" in date and "н" in date:
            period = True
        elif "ч" in date and "н" in date:
            period = True
            alternatively = True
        if period:
            date = date.split(" ")[0]
            start, end = date.split('-')
            date = {
                "start": start,
                "end": end,
                "alternatively": alternatively
            }
        dates.append(date)
    return dates
