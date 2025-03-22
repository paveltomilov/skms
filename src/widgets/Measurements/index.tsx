'use client';

import { useState } from 'react';
import PopUp from '@/entities/PopUp';
import Multimetr from '@/entities/Multimetr'; 
import ParentComponent from '@/entities/PopUp/ParentComponent';
import styles from './styles.module.scss';

const Measurements = () => {
  const [isPopUpOpen] = useState(false);

  return (
    <div className={styles.measurements}>
	  <ParentComponent />
      <PopUp isOpen={isPopUpOpen} />
      <Multimetr />
    </div>
  );
};

export default Measurements;
