import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

const MOCK_ALBUMS = [
  {
    titleLine1: 'Kizomba',
    titleLine2: 'Vol. 1',
    label: 'New Album',
    description:
      'The debut collection that started the journey. A blend of traditional rhythms and modern summer vibes — twelve tracks that capture the heartbeat of Kizomba.',
    spotifyLink: '#',
    appleMusicLink: '#',
    youtubeLink: '#',
    deezerLink: '#',
    order: 1,
    songs: [
      { title: 'Dança Comigo', duration: '04:12', trackNumber: 1 },
      { title: 'Teu Olhar', duration: '03:48', trackNumber: 2 },
      { title: 'Noite de Verão', duration: '04:35', trackNumber: 3 },
      { title: 'Só Nós', duration: '04:01', trackNumber: 4 },
      { title: 'Coração de Kizomba', duration: '04:50', trackNumber: 5 },
      { title: 'Até o Amanhecer', duration: '05:15', trackNumber: 6 },
      { title: 'Momentos', duration: '04:28', trackNumber: 7 },
      { title: 'Sem Pressa', duration: '03:57', trackNumber: 8 },
      { title: 'Alma & Corpo', duration: '04:44', trackNumber: 9 },
      { title: 'Nosso Ritmo', duration: '04:20', trackNumber: 10 },
      { title: 'Entre Nós', duration: '04:33', trackNumber: 11 },
      { title: 'Fica Comigo', duration: '05:02', trackNumber: 12 },
    ],
  },
  {
    titleLine1: 'Romantic',
    titleLine2: 'Nights',
    label: 'Album 2024',
    description:
      'A softer, more intimate chapter. Twelve love stories told through languid rhythms and whispered melodies — perfect for moments that deserve to last.',
    spotifyLink: '#',
    appleMusicLink: '#',
    youtubeLink: '#',
    deezerLink: '#',
    order: 2,
    songs: [
      { title: 'Primeira Vez', duration: '03:55', trackNumber: 1 },
      { title: 'Silêncio e Nós', duration: '04:22', trackNumber: 2 },
      { title: 'Pele com Pele', duration: '03:47', trackNumber: 3 },
      { title: 'Segredo', duration: '04:10', trackNumber: 4 },
      { title: 'Madrugada de Amor', duration: '05:03', trackNumber: 5 },
      { title: 'Olhos nos Olhos', duration: '03:38', trackNumber: 6 },
      { title: 'Devagar', duration: '04:29', trackNumber: 7 },
      { title: 'Tudo de Ti', duration: '03:51', trackNumber: 8 },
      { title: 'Noite Perfeita', duration: '04:44', trackNumber: 9 },
      { title: 'Amor sem Pressa', duration: '04:16', trackNumber: 10 },
      { title: 'Promessa', duration: '03:59', trackNumber: 11 },
      { title: 'Para Sempre', duration: '05:18', trackNumber: 12 },
    ],
  },
  {
    titleLine1: 'Sunset',
    titleLine2: 'Sessions',
    label: 'EP 2025',
    description:
      'Six golden-hour recordings captured live as the sun disappeared. Raw, warm, and unfiltered — the soul of Kizomba at its most honest.',
    spotifyLink: '#',
    appleMusicLink: '#',
    youtubeLink: '#',
    deezerLink: '#',
    order: 3,
    songs: [
      { title: 'Golden Hour', duration: '04:08', trackNumber: 1 },
      { title: 'Brisa do Mar', duration: '03:44', trackNumber: 2 },
      { title: 'Último Sol', duration: '04:55', trackNumber: 3 },
      { title: 'Horizonte', duration: '03:33', trackNumber: 4 },
      { title: 'Calor da Tarde', duration: '04:21', trackNumber: 5 },
      { title: 'Despedida do Dia', duration: '05:07', trackNumber: 6 },
      { title: 'Entre Estrelas', duration: '04:02', trackNumber: 7 },
      { title: 'Noite Começa', duration: '03:49', trackNumber: 8 },
      { title: 'Alma Livre', duration: '04:37', trackNumber: 9 },
      { title: 'Vento do Norte', duration: '04:13', trackNumber: 10 },
      { title: 'Marés', duration: '03:56', trackNumber: 11 },
      { title: 'Ao Cair da Noite', duration: '05:24', trackNumber: 12 },
    ],
  },
]

export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })

  const existing = await payload.count({ collection: 'albums' })
  if (existing.totalDocs > 0) {
    return NextResponse.json({ message: 'Already seeded', count: existing.totalDocs })
  }

  const created = []
  for (const album of MOCK_ALBUMS) {
    const doc = await payload.create({ collection: 'albums', data: album as any })
    created.push(doc.id)
  }

  return NextResponse.json({ message: 'Seeded successfully', created })
}
