'use client';

import { Card, Group, Text, TextInput } from '@mantine/core';
import { Button } from '../ui/Button';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { PRIVACY_POLICY_LINK } from '@/utils/constants';
import { useState } from 'react';

function Newsletter() {
  // const form = useForm({ mode: 'uncontrolled' });

  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  async function handleSubscribe(event: any) {
    event.preventDefault();
    console.log('Email value before submit:', email); // Add this line
    setLoading(true);
    setMessage('');

    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (!response.ok) {
        setMessage('An error has occurred. Please try again. ❌');
      } else {
        setMessage('Thanks for subscribing! 🥳');
        setEmail('');
      }
    } catch (err) {
      console.error('Failed to subscribe', err);
      setMessage('An error has occurred. Please try again. ❌');
    }
    setLoading(false);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <Card
      radius="md"
      style={{ color: 'white', width: '100%', padding: '0' }}
      className="!bg-slate-blue-500/75 flex w-full p-0"
    >
      <Text className="!text-[2rem] md:!text-[3.25rem] text-center w-full relative !p-4 !py-7 !border-b !border-pewter-gray-500 bg-gradient-to-t from-coal-950/50 to-transparent">
        Be the first to know
      </Text>

      <Group className="!flex !flex-col md:!flex-row !gap-0 w-full items-center !justify-center">
        {/* Text Section */}
        <Text className="!py-6 !px-[5rem] md:!px-6 text-center md:text-left md:w-1/2 flex items-center justify-center">
          Sign up for our newsletter for updates on all things Lit.
        </Text>

        {/* Input, Button, Text Group */}
        <Group
          style={{ padding: '2.375rem 2.5rem 1.5rem' }}
          className="md:!border-l !border-pewter-gray-500/50 !border-t md:!border-t-0 md:w-1/2 flex flex-col items-center !justify-center relative !pt-[2rem] md:!pt-[2.375rem] md:!pb-[1rem] !px-4 lg:!px-8 !gap-1"
        >
          {message && message.length > 0 ? (
            <div className="">
              <p>{message}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 items-center justify-center w-full max-w-full px-2 sm:px-6 md:px-4 lg:px-10"
            >
              <TextInput
                classNames={{
                  wrapper:
                    'min-w-[10rem] sm:min-w-[12rem] md:min-w-[8rem] lg:min-w-[12rem] flex-grow max-w-full',
                  input:
                    '!bg-slate-gray-500 !text-white border-white border-1 focus:!border-periwinkle-500',
                }}
                placeholder="Enter your email"
                className="!flex-grow"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                className="whitespace-nowrap"
                rightIcon={<IconArrowNarrowRight stroke={2} />}
              >
                Sign Up
              </Button>
            </form>
          )}

          <Text size="sm">
            By subscribing you agree to our{' '}
            <a className="!underline" href={PRIVACY_POLICY_LINK}>
              Privacy Policy
            </a>
          </Text>
        </Group>
      </Group>
    </Card>
  );
}

export default Newsletter;
