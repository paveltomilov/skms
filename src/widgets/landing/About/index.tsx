import React, {FC} from 'react';
import AboutBottom from './AboutBottom';
import AboutTop from './AboutTop';

const About: FC = () => {
    return (
        <section id="about">
            <AboutTop />
            <AboutBottom />
        </section>
    );
};

export default About;