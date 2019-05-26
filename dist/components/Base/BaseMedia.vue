<script>
  import BaseImage from './BaseImage.vue'
  import BaseVideo from './BaseVideo.vue'

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

      const item = store.state.wpr_media.media[context.props.id]
      const mediaDetails = item.media_details

      const mimeType = (() => {
        const splitted = item.mime_type.split('/')
        if(splitted.length >= 1) {
          // Making first char bigger
          return splitted[0].substr(0, 1).toUpperCase() + splitted[0].substr(1)
        }
        return 'Unknown'
      })()

      return h(cmps[`Base${mimeType}`], {
        props: {
          item,
          mediaDetails
        }
      })
    }
  }
</script>