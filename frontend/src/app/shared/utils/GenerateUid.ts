export const GenerateUid = len => {
	const buf = [];
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charlen = chars.length;
		const length = len || 32;

	for (let i = 0; i < length; i++) {
		buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
	}
	return buf.join('');
};
