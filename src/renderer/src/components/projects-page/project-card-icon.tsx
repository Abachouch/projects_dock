import React from 'react'
import { AppProjectType } from '../../../../types/project'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import AndroidIcon from '../../assets/icons/Android.svg'
import ExpressIcon from '../../assets/icons/Expressjs.svg'
import FlutterIcon from '../../assets/icons/Flutter.svg'
import folderIcon from '../../assets/icons/Folder.svg'
import JavaIcon from '../../assets/icons/Java.svg'
import JekyllIcon from '../../assets/icons/Jekyll.svg'
import PythonIcon from '../../assets/icons/Python.svg'
import ReactIcon from '../../assets/icons/React.svg'
import SvelteIcon from '../../assets/icons/Svelte.svg'
import VueIcon from '../../assets/icons/Vuejs.svg'
import NextjsIcon from '../../assets/icons/Nextjs.svg'
import NodeJsIcon from '../../assets/icons/Nodejs.svg'
// import HtmlIcon from '../../assets/icons/Html.svg'
// import Angularcon from '../../assets/icons/Angular.svg'
// import DenoIcon from '../../assets/icons/Deno.svg'
// import DockerIcon from '../../assets/icons/Docker.svg'
// import LaravelIcon from '../../assets/icons/Laravel.svg'
// import MarkdownIcon from '../../assets/icons/Markdown.svg'
// import MavenIcon from '../../assets/icons/Maven.svg'
// import ObesidianIcon from '../../assets/icons/Obsidian.svg'
// import SvgIcon from '../../assets/icons/Svg.svg'
// import WordpressIcon from '../../assets/icons/Wordpress.svg'

const getColorForName = (name: string): string => {
  const firstChar = name.charAt(0).toLowerCase()
  const hue = (firstChar.charCodeAt(0) - 97) * (360 / 26) // Spread across the color wheel
  const color = `hsl(${hue}, 70%, 50%)` // Adjust saturation and lightness for aesthetics
  return color
}

const getIcon = (type: AppProjectType, icon: string | undefined): string => {
  if (icon) return icon
  switch (type) {
    case AppProjectType.ANDROID:
      return AndroidIcon
    case AppProjectType.EXPRESS:
      return ExpressIcon
    case AppProjectType.FLUTTER:
      return FlutterIcon
    case AppProjectType.FOLDER:
      return folderIcon
    case AppProjectType.JAVA:
      return JavaIcon
    case AppProjectType.JEKYLL:
      return JekyllIcon
    case AppProjectType.PYTHON:
      return PythonIcon
    case AppProjectType.REACT:
      return ReactIcon
    case AppProjectType.SVELTE:
      return SvelteIcon
    case AppProjectType.VUE:
      return VueIcon
    case AppProjectType.NEXT:
      return NextjsIcon
    case AppProjectType.NODE:
      return NodeJsIcon
    // case AppProjectType.ANGULAR:
    //   return Angularcon
    // case AppProjectType.DENO:
    //   return DenoIcon
    // case AppProjectType.DOCKER:
    //   return DockerIcon
    // case AppProjectType.HTML:
    //   return HtmlIcon
    // case AppProjectType.LARAVEL:
    //   return LaravelIcon
    // case AppProjectType.MARKDOWN:
    //   return MarkdownIcon
    // case AppProjectType.MAVEN:
    //   return MavenIcon
    // case AppProjectType.OBSIDIAN:
    //   return ObesidianIcon
    // case AppProjectType.SVG:
    //   return SvgIcon
    // case AppProjectType.WORDPRESS:
    //   return WordpressIcon
    default:
      return folderIcon
  }
}

export const ProjectCardIcon = ({
  name,
  icon,
  type
}: {
  name: string | undefined
  icon: string | undefined
  type: AppProjectType
}): React.JSX.Element => {
  return (
    <Avatar className="w-10 h-10 justify-self-center">
      <AvatarImage className="" src={getIcon(type, icon)} />
      <AvatarFallback style={{ backgroundColor: getColorForName(name || 'Unknowen') }}>
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
