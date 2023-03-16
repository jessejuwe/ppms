'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, ListGroup, Tabs } from 'flowbite-react';
import { Divider } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { SERVICES, TABS } from '@/helpers/section-helper';

const Sections: React.FC = () => {
  const router = useRouter();

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );
  // const [smallSize, setSmallSize] = useState(false);

  // const windowSizeHandler = useCallback(() => {
  //   window.innerWidth >= 768 ? setSmallSize(true) : setSmallSize(false);
  // }, []);

  // useEffect(() => {
  //   windowSizeHandler();

  // Event Listener for resize
  //   window.addEventListener('resize', windowSizeHandler);

  //   return window.removeEventListener('resize', windowSizeHandler);
  // }, [windowSizeHandler]);

  return (
    <AnimatePresence>
      <section className="info__summary section" key="info__summary">
        <div className="section__title first-section">
          <h2 className="section__description">About Us</h2>
          <h3 className="section__header">More things to know about PPMS</h3>
          <article>
            One of the main purposes of Programmes and Projects Management
            Systems is to ease the management’s burden of constant manual
            monitoring of the progress of the Commission’s core mandate
            activities.
          </article>
          <article className="article-span">
            The System will assist management to ensure that important goals are
            achieved as planned.
          </article>
          <article className="article-span">
            The systems will be designed to share key information among team
            members and to harness ideas and inputs at different levels that
            will help achieve the desired objectives.
          </article>
          <Button
            pill={true}
            size="sm"
            href="/about"
            // onClick={() => handleNavigate('/about')}
            className="section-button"
            outline={false}
          >
            See more
          </Button>
        </div>

        {
          <Divider
            className="horizontal-divider"
            orientation="horizontal"
            color="white"
            width="5xl"
          />
        }

        {
          <Divider
            className="vertical-divider"
            orientation="vertical"
            color="white"
            height="lg"
          />
        }

        <div className="section__title second-section" key="second-section">
          <h2 className="section__description">Services</h2>
          <h3 className="section__header">What PPMS can offer for you</h3>
          <p>PPMS offers the following services</p>
          <ListGroup>
            {SERVICES.map((item, index) => (
              <ListGroup.Item key={index} href={item.to}>
                {item.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button
            pill={true}
            size="sm"
            href="/services"
            // onClick={() => handleNavigate('/about')}
            className="section-button"
            outline={false}
          >
            See more
          </Button>
        </div>
      </section>

      <div className="tabbed-section" key="tabbed-section">
        <h2>Features</h2>
        <h3>Use PPMS with ease</h3>
        <Tabs.Group
          aria-label="Full width tabs"
          style="fullWidth"
          className="tabs-group"
        >
          {TABS.map((tab, index) => (
            <Tabs.Item
              key={`${tab.title}-${index}`}
              active={tab.active}
              title={tab.title}
              className="tabs-item"
            >
              <div className="tabs-item-group">
                <motion.div
                  key="tabs-item-info"
                  className="tabs-item-info"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: 'easeInOut',
                    delayChildren: 0.5,
                  }}
                  exit={{ opacity: 0 }}
                >
                  <h2>{tab.heading}</h2>
                  <span className="tabs-description">{tab.description}</span>
                  <Button
                    pill={false}
                    className="sign-up"
                    href="/sign-up"
                    // onClick={() => handleNavigate('/sign-up')}
                    outline={false}
                  >
                    Get started
                  </Button>
                </motion.div>
                <motion.div
                  key="tabs-item-img"
                  className="tabs-item-img"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: 'easeInOut',
                    delayChildren: 0.5,
                  }}
                  exit={{ opacity: 0 }}
                >
                  <Image src={tab.img} alt={tab.alt} />
                </motion.div>
              </div>
            </Tabs.Item>
          ))}
        </Tabs.Group>
      </div>

      <div className="join-us-section app__flex" key="join-section">
        <motion.div
          className="inner-section"
          key="inner-section"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileInView={{ y: [-50, 0], opacity: [0, 1] }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            delayChildren: 0.5,
          }}
          exit={{ opacity: 0 }}
        >
          <h1>Start using PPMS today</h1>
          <Button
            href="/sign-up"
            pill
            className="section-button"
            outline={false}
          >
            Join us
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Sections;
