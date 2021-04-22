<template>
  <section>
    <div
      class="options-box"
      v-for="(option, optionIndex) in options"
      :key="option.id"
    >
      <div class="options-box--left">
        <b-input
          :value="option.title"
          :placeholder="`Option ${option.order}`"
          style="margin-bottom: 12px;"
          @input="onChangeOptionTitle($event, optionIndex)"
        ></b-input>
      </div>
      <div class="options-box--right">
        <b-button
          type="is-danger is-light"
          size="is-small"
          @click="removeOption(optionIndex)"
          :disabled="isRemoveOptionDisabled"
        >Remove</b-button>
      </div>
    </div>

    <b-button
      type="is-primary is-light"
      size="is-small"
      @click="addNewOption"
    >
      Add Option
    </b-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { id: 1, order: 1, title: 'Option 1' }
      ]
    }
  },

  computed: {
    isRemoveOptionDisabled() {
      return this.options.length === 1
    }
  },

  created() {
    this.emitDropdownOptions()
  },

  methods: {
    addNewOption() {
      const lastOption = this.options[this.options.length - 1]
      const newID = lastOption.id + 1
      const newOrder = lastOption.order + 1
      this.options.push({
        id: newID,
        order: newOrder,
        title: `Option ${newOrder}`
      })
      this.emitDropdownOptions()
    },

    onChangeOptionTitle(newOptionTitle, optionIndex) {
      this.options[optionIndex].title = newOptionTitle
      this.emitDropdownOptions()
    },

    updateOrderValues() {
      for (let index = 0; index < this.options.length; index++) {
        const option = this.options[index];
        option.order = index + 1
      }
    },

    removeOption(optionIndex) {
      this.options.splice(optionIndex, 1)
      this.updateOrderValues()
      this.emitDropdownOptions()
    },

    emitDropdownOptions() {
      this.$emit('on-change-dropdown-options', {
        options: this.options
      })
    }
  }
}
</script>

<style scoped>
.options-box {
  display: flex;
}
.options-box--left {
  width: 85%;
}

.options-box--right {
  margin-left: 12px;
  margin-top: 6px;
}
</style>