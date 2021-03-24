import { createLightship } from 'lightship'

function getLightshipAddress(lightship) {
  const address = lightship.server.address()
  if (!address) return null
  return `http://localhost:${address.port}`
}

export default function lightship(moduleOptions) {
  if (!this.nuxt.options.server) return

  const options = { ...this.options.lightship, ...moduleOptions }

  const lightship = createLightship(options)
  const address = getLightshipAddress(lightship)

  this.nuxt.options.cli.badgeMessages.push(
    `Lightship Health URL: ${address}/health`,
  )
  this.nuxt.options.cli.badgeMessages.push(
    `Lightship Liveness Probe URL: ${address}/live`,
  )
  this.nuxt.options.cli.badgeMessages.push(
    `Lightship Readiness Probe URL: ${address}/ready`,
  )

  this.nuxt.hook('listen', async (server, { host, port }) => {
    lightship.signalReady()
  })

  this.nuxt.hook('close', async () => {
    await lightship.shutdown()
  })

  lightship.registerShutdownHandler(async () => {
    await this.nuxt.close()
  })
}

export const meta = {
  name: 'nuxt-lightship',
}
