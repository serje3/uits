from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from events.models import UserEvent


class EventSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if data['started_at'] >= data['ended_at']:
            print(data['started_at'], data['ended_at'], data['started_at'] <= data['ended_at'])
            raise ValidationError('The start date must be before the end date.')
        print(data)
        return data

    class Meta:
        model = UserEvent
        fields = '__all__'
        read_only_fields = ('user', )
