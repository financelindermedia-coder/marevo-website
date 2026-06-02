import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function DashboardView() {
  const payload = await getPayload({ config: configPromise })

  const [albumsResult, mediaResult] = await Promise.all([
    payload.find({ collection: 'albums', limit: 5, sort: '-createdAt', depth: 0 }),
    payload.count({ collection: 'media' }),
  ])

  const totalTracks = albumsResult.docs.reduce(
    (sum, album) => sum + (album.songs?.length ?? 0),
    0,
  )

  const s: Record<string, React.CSSProperties> = {
    root: {
      fontFamily: 'system-ui, sans-serif',
      padding: '2.5rem',
      maxWidth: '1100px',
      color: '#e8e0d8',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid rgba(255,171,64,0.15)',
    },
    logo: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '0.25em',
      color: '#FFAB40',
      textTransform: 'uppercase' as const,
    },
    logoSub: {
      fontSize: '0.7rem',
      letterSpacing: '0.3em',
      textTransform: 'uppercase' as const,
      color: 'rgba(232,224,216,0.4)',
      marginTop: '2px',
    },
    viewSite: {
      padding: '0.5rem 1.25rem',
      border: '1px solid rgba(255,171,64,0.4)',
      borderRadius: '4px',
      color: '#FFAB40',
      textDecoration: 'none',
      fontSize: '0.75rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      transition: 'all 0.2s',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.25rem',
      marginBottom: '2.5rem',
    },
    statCard: {
      background: 'rgba(255,171,64,0.06)',
      border: '1px solid rgba(255,171,64,0.12)',
      borderRadius: '8px',
      padding: '1.5rem',
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFAB40',
      lineHeight: 1,
      marginBottom: '0.5rem',
    },
    statLabel: {
      fontSize: '0.7rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase' as const,
      color: 'rgba(232,224,216,0.5)',
    },
    section: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '0.7rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase' as const,
      color: 'rgba(255,171,64,0.6)',
      marginBottom: '1rem',
    },
    actionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '2.5rem',
    },
    actionBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 1.25rem',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '8px',
      color: '#e8e0d8',
      textDecoration: 'none',
      fontSize: '0.85rem',
      transition: 'all 0.2s',
    },
    actionIcon: {
      fontSize: '1.25rem',
      width: '2rem',
      textAlign: 'center' as const,
    },
    albumList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem',
    },
    albumRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '8px',
    },
    albumTitle: {
      fontWeight: 600,
      color: '#e8e0d8',
      fontSize: '0.9rem',
    },
    albumMeta: {
      fontSize: '0.75rem',
      color: 'rgba(232,224,216,0.4)',
      marginTop: '2px',
    },
    albumEdit: {
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      color: 'rgba(255,171,64,0.6)',
      textDecoration: 'none',
      textTransform: 'uppercase' as const,
    },
    emptyState: {
      padding: '2rem',
      textAlign: 'center' as const,
      color: 'rgba(232,224,216,0.3)',
      fontSize: '0.85rem',
      border: '1px dashed rgba(255,255,255,0.08)',
      borderRadius: '8px',
    },
  }

  return (
    <div style={s.root}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <div style={s.logo}>Marevo</div>
          <div style={s.logoSub}>Content Management</div>
        </div>
        <a href="/" target="_blank" rel="noreferrer" style={s.viewSite}>
          ↗ Live Site
        </a>
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        <div style={s.statCard}>
          <div style={s.statNumber}>{albumsResult.totalDocs}</div>
          <div style={s.statLabel}>Albums</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statNumber}>{totalTracks}</div>
          <div style={s.statLabel}>Tracks</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statNumber}>{mediaResult.totalDocs}</div>
          <div style={s.statLabel}>Media Files</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Quick Actions</div>
        <div style={s.actionsGrid}>
          <a href="/admin/collections/albums/create" style={s.actionBtn}>
            <span style={s.actionIcon}>＋</span>
            <div>
              <div>New Album</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(232,224,216,0.4)', marginTop: '2px' }}>
                Add a new release
              </div>
            </div>
          </a>
          <a href="/admin/collections/media/create" style={s.actionBtn}>
            <span style={s.actionIcon}>↑</span>
            <div>
              <div>Upload Media</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(232,224,216,0.4)', marginTop: '2px' }}>
                Cover art, images
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Albums */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Albums</div>
        {albumsResult.docs.length === 0 ? (
          <div style={s.emptyState}>
            No albums yet — create your first one above.
          </div>
        ) : (
          <div style={s.albumList}>
            {albumsResult.docs.map((album) => (
              <div key={album.id} style={s.albumRow}>
                <div>
                  <div style={s.albumTitle}>
                    {album.titleLine1} {album.titleLine2}
                  </div>
                  <div style={s.albumMeta}>
                    {album.songs?.length ?? 0} tracks
                    {album.label ? ` · ${album.label}` : ''}
                  </div>
                </div>
                <a href={`/admin/collections/albums/${album.id}`} style={s.albumEdit}>
                  Edit →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardView
