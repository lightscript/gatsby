import React from 'react'
//import { prefixLink } from './gatsby-helpers'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw!public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

const htmlStyles = (args = {}) => {
  if (process.env.NODE_ENV === `production`) {
    if (args.link) {
      // If the user wants to reference the external stylesheet return a link.
      //return <link rel="stylesheet" type="text/css" href={prefixLink(`/styles.css`)} media="screen" />
    } else {
      // Default to returning the styles inlined.
      return <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />
    }
  }

  // In dev just return an empty style element.
  return <style />
}

module.exports = htmlStyles