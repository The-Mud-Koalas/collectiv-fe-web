import React from 'react'
import NavbarLink from '../NavLink'
import NavbarGroup from '../NavGroup'

interface Props {
    element: NavGroupType | NavLinkType
}

const NavbarElement: React.FC<Props> = ({ element }) => {
  if ("url" in element) return <NavbarLink {...element}/>

  return <NavbarGroup {...element}/>
}

export default NavbarElement