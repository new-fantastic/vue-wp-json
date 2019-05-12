<template>
  <div
    class="banner position__relative overflow--hidden width--100 height--100"
  >
    <div
      class="banner__inner width--100 height--100"
    >
      <div
        class="banner__background position__absolute--center width--100 height--100"
        style="z-index: -1;"
      >
        <div
          class="banner__background__inner width--100 height--100"
        >
          <img
          class="banner__background__image width--100 height--100 object-fit--cover desktop--hidden"
          v-if="data['background_image_desktop']"
          :src="data['background_image_desktop'].url"
          :alt="data['background_image_desktop'].alt"
          >
          <img
            class="banner__background__image width--100 height--100 object-fit--cover mobile--hidden"
            v-if="data['background_image_mobile']"
            :src="data['background_image_mobile'].url"
            :alt="data['background_image_mobile'].alt"
          >
        </div>
      </div>
      <div
        class="banner__content width--100 height--100 padding--md"
        :class="{
          'padding__x--lg' : data['inner_layout']['margins_x'],
          'padding__y--sm' : data['inner_layout']['margins_y'] === 'small',
          'padding__y--lg' : data['inner_layout']['margins_y'] === 'big'
          }"
      >
        <div
          class="banner__content__inner container__inner--boxed width--100 height--100"
          :class="{
            'padding--xs' : data.inner_layout.padding === 'xs',
            'padding--sm' : data.inner_layout.padding === 'sm',
            'padding--md' : data.inner_layout.padding === 'md',
            'padding--lg' : data.inner_layout.padding === 'lg',
            'padding--xl' : data.inner_layout.padding === 'xl',
            'placement__x--left' :
              data['inner_layout']['text_position_x'] === 'left',
            'placement__x--center' :
              data['inner_layout']['text_position_x'] === 'center',
            'placement__x--right' :
              data['inner_layout']['text_position_x'] === 'right',
            'placement__y--top' :
              data['inner_layout']['text_position_y'] === 'top',
            'placement__y--center' :
              data['inner_layout']['text_position_y'] === 'center',
            'placement__y--bottom' :
              data['inner_layout']['text_position_y'] === 'bottom',
          }"
        >
          <div
            class="banner__description max-height--100"
            :class="{
              'text__color--light' : data.text_color === 'light',
              'text__color--dark' : data.text_color === 'dark'
            }"
          >
            <h2
              class="banner__title margin__bottom--ms"
              :class="{
                'color--dark' : titleDark,
                'color--light' : titleLight,
                'text__align--left' : data.inner_layout.text_position_x === 'left',
                'text__align--right' : data.inner_layout.text_position_x === 'right',
                'text__align--center' : data.inner_layout.text_position_x === 'center'
              }"
              v-if="data['title']"
              v-html="data['title']"
            />
            <div
              class="banner__subtitle"
              :class="{
                'color--dark' : titleDark,
                'color--light' : titleLight,
                'text__align--left' : data.inner_layout.text_position_x === 'left',
                'text__align--right' : data.inner_layout.text_position_x === 'right',
                'text__align--center' : data.inner_layout.text_position_x === 'center'
              }"
              v-if="data['subtitle']"
              v-html="data['subtitle']"
            />
            <div
              class="banner__actions flex--wrap margin__top--md"
              :class="{
                'placement__x--left' :
                  data['inner_layout']['text_position_x'] === 'left',
                'placement__x--center' :
                  data['inner_layout']['text_position_x'] === 'center',
                'placement__x--right' :
                  data['inner_layout']['text_position_x'] === 'right',
                'placement__y--top' :
                  data['inner_layout']['text_position_y'] === 'top',
                'placement__y--center' :
                  data['inner_layout']['text_position_y'] === 'center',
                'placement__y--bottom' :
                  data['inner_layout']['text_position_y'] === 'bottom',
              }"
              v-if="data.actions"
            >
              <BaseButton
                v-for="(button, index) in data.actions"
                :key="button['button_link']"
                class="margin__right--ms"
                :class="{
                  'dark' : button['button_color'] === 'dark',
                  'light' : button['button_color'] === 'light',
                  'outline' : false
                }"
                :size="button['button_size']"
                :link="button['button_link']"
                :externalLink="externalLink[index]"
              >
                {{ button['button_label'] }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IsLinkExternal from '../../../util/IsLinkExternal'

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  components: {
    BaseButton: () => import('../../Base/BaseButton.vue')
  },
  computed: {
    externalLink () {
      const links = []
      this.data.actions.forEach(el => {
        links.push(
          IsLinkExternal(el['button_link'])
        )
      })
      return links
    }
  }
}
</script>

<style>

  @import '../../../styles/main.css';

  .banner__actions .btn:last-of-type {
    margin-right: 0;
  }

</style>
