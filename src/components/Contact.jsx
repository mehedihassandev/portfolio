import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { slideIn } from '../../src/utils/Motion';
import { EarthCanvas } from "./canvas";

const Contact = () => {
  const fromRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_hj1x7jj', 'template_b698dpi',
      {
        from_name: form.name,
        to_name: 'Md Mehedi Hassan',
        from_email: form.email,
        to_email: 'mh582689@gmail.com',
        message: form.message,
      },
      'JtawMbILX7UjxMsVf'
    )
      .then(() => {
        setLoading(false);
        alert('Your message has been sent!');

        setForm({
          name: '',
          email: '',
          message: '',
        })
      }, (error) => {
        setLoading(false);
        console.log(error);

        alert('Something went wrong, please try again later');
      })
  }


  //template_b698dpi
  //service_hj1x7jj
  //JtawMbILX7UjxMsVf

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form
          ref={fromRef}
          onSubmit={handleSubmit}
          className="mt-12 flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-teritary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium mb-4"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your e-mail?"
              className="bg-teritary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium mb-4"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows='7'
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-teritary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium mb-4"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>

  )
}

export default SectionWrapper(Contact, "contact");


