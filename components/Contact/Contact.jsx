'use client';

import styles from './Contact.module.css';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SOCIAL_LINKS } from '@/lib/constants';

export default function Contact() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>

        {/* left info */}
        <div className={styles.info}>
          <h2 className={styles.infoTitle}>let’s talk</h2>
          <p className={styles.infoDesc}>
            got an idea, feedback, or just wanna say hi?  
            i’m always open for conversations.
          </p>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.label}>email</span>
              <span className={styles.value}>{SOCIAL_LINKS.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>location</span>
              <span className={styles.value}>indonesia</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>availability</span>
              <span className={styles.value}>open to collab & discussion</span>
            </div>
          </div>
        </div>

        {/* right card */}
        {/* <CardContainer containerClassName={styles.cardContainer} className="w-[560px]">
          <CardBody className={styles.card}>

            <CardItem translateZ={50}>
              <h3 className={styles.cardTitle}>
                got something in mind?
              </h3>
            </CardItem>

            <form className={styles.form}>
              <CardItem translateZ={30} className={styles.full}>
                <input
                  type="text"
                  placeholder="your name"
                  className={styles.input}
                />
              </CardItem>

              <CardItem translateZ={30} className={styles.full}>
                <input
                  type="email"
                  placeholder="your email"
                  className={styles.input}
                />
              </CardItem>

              <CardItem translateZ={25} className={styles.full}>
                <textarea
                  placeholder="tell me a little about it..."
                  className={styles.textarea}
                />
              </CardItem>

              <CardItem translateZ={60}>
                <button className={styles.button}>
                  send message
                </button>
              </CardItem>
            </form>

            <CardItem translateZ={10}>
              <p className={styles.hint}>
                no pressure. no spam. just a simple conversation.
              </p>
            </CardItem>

          </CardBody>
        </CardContainer> */}

      </div>
    </section>
  );
}
