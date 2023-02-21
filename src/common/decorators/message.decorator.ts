import { SetMetadata } from '@nestjs/common';

export const MESSAGE_KEY = 'messages';
export const Messages = (message: string) => SetMetadata(MESSAGE_KEY, message);
