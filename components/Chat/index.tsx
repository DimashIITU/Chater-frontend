import React from 'react';
import Image from 'next/image';

import clsx from 'clsx';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

import ChatPortal from '../../HOC/Chat';
import { Avatar } from '../Avatar';
import { Status } from '../Status';

import styles from './Chat.module.scss';

interface ChatProps {
  onClose: () => void;
  isOnline: boolean;
}

export const Chat: React.FC<ChatProps> = ({ onClose, isOnline }) => {
  const { userName } = useAppSelector(selectUserData);

  const [isCalling, setIsCalling] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const bottomRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      scrollToBottom(bottomRef.current, 'manual');
    }, 20);
  }, []);

  const scrollToBottom = (el: HTMLElement, type: 'smooth' | 'manual') => {
    if (type === 'smooth') {
      el?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else {
      el?.scrollIntoView({ block: 'end' });
    }
  };
  const sendWithKeyboard = (e) => {
    if (e.code === 'Enter') {
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (inputValue) {
      setMessages((prev) => [...prev, { text: inputValue, senderName: userName }]);
      scrollToBottom(bottomRef.current, 'smooth');
      setInputValue('');
    }
  };
  return (
    <ChatPortal>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.image}>
            <Avatar src="/static/close.svg" width="50px" height="50px"></Avatar>
          </div>
          <div className={styles.name}>dimash serik .</div>
          <Status isOnline={isOnline} width="10px" height="10px" />
          <button onClick={() => setIsCalling(true)} className={styles.call}>
            <Image src="/static/call.png" alt="call" width={40} height={40} />
          </button>
          <button className={styles.close}>
            <Image
              onClick={onClose}
              width={20}
              height={20}
              src="/static/close.svg"
              alt="Close"
              className={styles.closeBtn}
            />
          </button>
        </div>
        {!isCalling ? (
          <>
            <div className={styles.body}>
              <button
                onClick={() => scrollToBottom(bottomRef.current, 'smooth')}
                className={styles.scrollButton}>
                <Image src={'/static/arrBottom.png'} width={20} height={20} alt={'scroll'} />
              </button>
              {messages.map((message) => (
                <div
                  className={clsx(
                    message.senderName === userName ? styles.messageOwn : styles.message,
                  )}>
                  {message.text}
                </div>
              ))}
              <div ref={bottomRef} className={styles.bottom}></div>
            </div>
            <div className={styles.typing}>
              <textarea
                onKeyDown={sendWithKeyboard}
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.input}
              />
              <button onClick={sendMessage} className={styles.send}>
                <Image src={'/static/send.png'} width={20} height={20} alt={'send'} />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.callContainer}>
            <div className={styles.content}>
              <Avatar width="180px" height="180px" />
              <div onClick={() => setIsCalling(false)} className={styles.closeButton}>
                <Image src={'/static/close.svg'} width={50} height={50} alt={'closeBtn'} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ChatPortal>
  );
};
