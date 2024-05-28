import { FC, FormEvent, useState } from "react";

interface ContactMeProps {}

const ContactMe: FC<ContactMeProps> = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    messageSubject: "",
    message: "",
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: Send an email with data
    console.log(formData);
  }

  return (
    <div className='mt-20 max-w-lg mx-auto'>
      <h2 className='text-4xl text-gray-400 font-bold'>Contact me</h2>
      <div className='mt-4'>
        <form onSubmit={handleSubmit}>
          <input
            value={formData.clientName}
            onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
            className='border-b-2 border-gray-300 block px-2 py-3 w-full rounded-xl mb-2'
            type='text'
            required
            name='client-name'
            id='client-name'
            placeholder='your name'
          />
          <input
            value={formData.clientEmail}
            onChange={(e) => setFormData((prev) => ({ ...prev, clientEmail: e.target.value }))}
            className='border-b-2 border-gray-300 block px-2 py-3 w-full rounded-xl mb-2'
            type='email'
            name='client-email'
            id='client-email'
            placeholder='you@email.com'
          />
          <input
            value={formData.messageSubject}
            onChange={(e) => setFormData((prev) => ({ ...prev, messageSubject: e.target.value }))}
            className='border-b-2 border-gray-300 block px-2 py-3 w-full rounded-xl mb-2'
            type='text'
            name='message-subject'
            id='message-subject'
            placeholder='subject'
          />
          <textarea
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className='border-b-2 border-gray-300 resize-none block px-2 py-3 w-full rounded-xl mb-2'
            name='message'
            required
            id='message'
            rows={5}
            placeholder='message...'
          ></textarea>
          <button type='submit' className='border-2 bg-zinc-700 px-4 flex'>
            Send with ❤️
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactMe;
