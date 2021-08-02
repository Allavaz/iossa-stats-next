import Results from '../../components/results';
import { getMatches } from '../../lib/getFromDB';
import Head from 'next/head';
import Torneos from '../../utils/Torneos.json';
import Selector from '../../components/selector';
import { useRouter } from 'next/router';
import { getAllQueries } from '../../utils/Utils';

function getCategory(arg) {
  if (arg === 'all') {
    return "Totales";
  } else if (arg.startsWith("t")) {
    return ("Temporada " + arg.replace('t', ''));
  } else if (arg === 'selecciones') {
    return "Selecciones";
  } else {
    for (let i in Torneos) {
      for (let j in Torneos[i].torneos) {
        if (arg === Torneos[i].torneos[j].query) {
          return Torneos[i].torneos[j].torneo;
        }
      }
    }
  }
}

function getTemporada(arg) {
  if (arg.startsWith('t') || arg === 'all' || arg === 'selecciones') {
    return arg;
  } else {
    for (let i in Torneos) {
      for (let j in Torneos[i].torneos) {
        if (arg === Torneos[i].torneos[j].query) {
          return Torneos[i].temporada;
        }
      }
    }
  }
  if (document.getElementById("selector")) {
    let selector = document.getElementById("selector");
    for (let i in selector.options) {
      if (selector.options[i].value === arg) {
        selector.selectedIndex = i;
      }
    }
  }
}

export async function getServerSideProps(context) {
  let id;
  if (context.params.id) id = context.params.id[0];
  else id = 't7';
  if (getAllQueries().includes(id)) {
    let matches = await getMatches(id);
    let category = getCategory(id);
    return ({props: {
      matches: JSON.parse(JSON.stringify(matches)),
      category: category,
      temporada: getTemporada(id)
    }});
  } else {
    return ({ notFound: true });
  }
}

export default function Resultados({ matches, category, temporada }) {
  const router = useRouter();

  function selectTorneo(id) {
    router.push('/resultados/' + id);
  }

  return (
    <>
      <Head>
        <title>Resultados {category} | IOSoccer Sudamérica</title>
      </Head>
      <Selector selectTorneo={selectTorneo} selectTemporada={selectTorneo} temporada={temporada}></Selector>
      <Results matches={matches} category={category} />
    </>
  )
}