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

    <div class="columns">
      <div class="column">
        <b-field>
          <b-switch
            type="is-success"
            v-model="isAddOther"
            @input="emitMCQOptions"
          >
            Add Other
          </b-switch>
        </b-field>
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
  props: {
    isUpdating: {
      type: Boolean,
      required: false
    },
    questionConfig: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      isAddOther: false,
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
    if (this.isUpdating) {
      if (Object.keys(this.questionConfig).length > 0) {
        this.isAddOther = this.questionConfig.isAddOther
        this.options = this.questionConfig.options
      } else {
        this.isAddOther = false
        this.options = [
          { id: 1, order: 1, title: 'Option 1' }
        ]
      }
    }
    this.emitMCQOptions()
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
      this.emitMCQOptions()
    },

    onChangeOptionTitle(newOptionTitle, optionIndex) {
      this.options[optionIndex].title = newOptionTitle
      this.emitMCQOptions()
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
      this.emitMCQOptions()
    },

    emitMCQOptions() {
      this.$emit('on-change-mcq-options', {
        options: this.options,
        isAddOther: this.isAddOther
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