/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Details.module.css"

export interface SpecificPokemon {
    name: string,
    type: string[],
    image: string,
    stats: { name: string, value: number }[]
}

const MyPokemon = () => {
    const [pokemon, setPokimon] = useState<SpecificPokemon | null>(null)
    useEffect(() => {
        async function getPokimon() {
            const resp = await fetch(`https://pokemon-data-set.vercel.app/pokemon/${id}.json`)
            setPokimon(await resp.json())
        }
        getPokimon();
    }, [])
    const { query: { id } } = useRouter()
    if (!pokemon) {
        return null
    }
    return (
        <>
            <Link href={"/"}>Go to Home</Link>
            <div className={styles.layout}>
                <div>
                    <img className={styles.picture} src={`https://pokemon-data-set.vercel.app/${pokemon.image}`} alt="mg" />
                </div>
                <div>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>{pokemon.type.join(", ")}</div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(({ name, value }) => {
                                return (<tr key={name}>
                                    <td className={styles.attribute}>
                                        {name}
                                    </td>
                                    <td>
                                        {value}
                                    </td>
                                </tr>)
                            })
                            }
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    )
}

export default MyPokemon