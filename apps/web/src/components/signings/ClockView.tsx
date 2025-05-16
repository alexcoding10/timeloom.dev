'use client'
import Container from '@/components/Container';
import React from 'react'
import Clock from 'react-live-clock';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español para moment
moment.locale('es');       // Establece el idioma por defecto

export default function ClockView() {
    return (
        <Container>
            <Clock
                format={'dddd, DD MMMM YYYY'}
                ticking={true}
                timezone={'Europe/Madrid'}
                className="font-montserrat text-neutral-dark-400 text-lg md:text-xl font-semibold capitalize transition-all duration-300 ease-in-out"
            />
            <Clock
                format="HH[h] mm[m] ss[s]"
                ticking={true}
                timezone="Europe/Madrid"
                className="font-montserrat text-neutral-dark-400 text-3xl md:text-5xl font-bold transition-all duration-300 ease-in-out"
            />
        </Container>
    )
}
