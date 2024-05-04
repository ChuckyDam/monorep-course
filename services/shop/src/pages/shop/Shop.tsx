import { getCookie } from '@/js/Cookie' // @ - Вот это и есть алиас, который прописан в buildResolves
import React from 'react'
import { Link } from 'react-router-dom';
import { shopRoutes } from "@packages/shared/src/routes/shop"


type Props = {}

export default function Shop({}: Props) {

  console.log(getCookie(5));

  return (
    <div>
      <Link to={shopRoutes.second}>Вторая страница</Link>
        Lorem ipsum dodem odio a nemo molestiae repellat in. Repellendus nihil voluptates quae, ipsum non veniam est aperiam autem, ipsam odio necessitatibus eveniet voluptate at possimus placeat sint! Quidem, expedita magnam?
    </div>
  )
}