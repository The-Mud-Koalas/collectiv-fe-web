import { inter } from '@/utils/constants/fonts';
import Link from 'next/link';
import React from 'react'
import NavbarElement from './NavElement';

interface Props {
  elements: NavLinksType;
}

const NavbarLinks: React.FC<Props> = ({ elements }) => {
  return (
    <ul className="flex gap-4">
      {
        elements.map(
          (navLink, idx) => <li key={`nl-${idx}`}>
            <NavbarElement element={navLink}/>
          </li> 
        )
      }
    </ul>
  )
}

export default NavbarLinks