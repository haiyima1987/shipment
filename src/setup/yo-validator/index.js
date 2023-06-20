import YoValidator from 'yo-validator';

const messages = {
  locale: 'en',
  en: {
    messages: {
      default: 'Invalid field.',
      required: {
        default: 'Required field.',
      }
    }
  }
}

YoValidator.setMessages(messages);

export default YoValidator;
