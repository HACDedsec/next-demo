/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface specificPokemon{id:number, name: string, image: string}


const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const router = useRouter();
  const [pokemonList, setPokimonList] = useState([])
  useEffect(() => {
  async function getPokimon() {
    const resp = await fetch("https://pokemon-data-set.vercel.app/index.json")
    setPokimonList(await resp.json())
  }
  getPokimon();
  }, [])
  
  return (
    <>
      <Head>
        <title>Pokemon App</title> 
      </Head>
      <div className={styles.grid}>
    {pokemonList.map((e:specificPokemon)=>{
      console.log('single pokemon: ', e)
      return(
        <>
        <div key={e.id} className={styles.card}>
        <Link href={`/pokemon/${e.id}`}>
          <img src={`https://pokemon-data-set.vercel.app/${e.image}`} alt="img"></img>
          <h3>{e.name}</h3>
        </Link>
          </div>
        </>
      )
    }) }
      </div>
    </>
  )
}
