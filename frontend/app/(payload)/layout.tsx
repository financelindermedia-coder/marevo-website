import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import type { ServerFunctionClient } from 'payload'
import React from 'react'
import { importMap } from './admin/importMap'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
)

export default Layout
