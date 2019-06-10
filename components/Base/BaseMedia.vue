<script>
  import BaseImage from './BaseImage.vue'
  import BaseVideo from './BaseVideo.vue'
  import { ModulePrefix } from '../../index'

  const cmps = {
    BaseImage,
    BaseVideo
  }

  export default {
    functional: true,

    props: {
      id: {
        type: Number,
        required: true
      }
    },

    render (h, context) {
      const store = context.parent.$store

      const item = store.state[`${ModulePrefix}_media`].media[context.props.id]
      const mediaDetails = item.media_details

      const mimeType = (() => {
        const splitted = item.mime_type.split('/')
        if (splitted.length >= 1) {
          // Making first char bigger
          const biggerStartName = splitted[0].substr(0, 1).toUpperCase() + splitted[0].substr(1)
          if (`Base${biggerStartName}` in cmps) {
            return splitted[0].substr(0, 1).toUpperCase() + splitted[0].substr(1)
          }
          return h('span', 'Not supported format for BaseMedia: ' + splitted[0])
        }
        
        return h('span', 'Not supported format for BaseMedia: ' + item.mime_type)
      })()

      if (typeof mimeType !== 'string') {
        // Renders span with error message
        return mimeType
      }

      let on = {}
      if(context.listeners && Object.keys(context.listeners).length > 0) {
        on = {
          ...context.listeners
        }
      }

      return h(cmps[`Base${mimeType}`], {
        props: {
          item,
          mediaDetails
        },
        ...on
      })
    }
  }
</script>