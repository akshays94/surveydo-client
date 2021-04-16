<template>
  <section style="border: 1px solid lightgray; padding: 18px;">
    <div class="columns">
      <div class="column is-8">
        <b-field label="Question">
          <b-input
            placeholder="Question"
            v-model="questionTitle"
          ></b-input>
        </b-field>
      </div>

      <div class="column is-4">
        <b-field label="Type">
          <b-select
            placeholder="Select question type"
            expanded
            v-model="questionType"
          >
              <option
                  v-for="questionType in questionTypes"
                  :value="questionType.code"
                  :key="questionType.code">
                  {{ questionType.title }}
              </option>
          </b-select>
        </b-field>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-field>
          <b-switch
            type="is-success"
            v-model="isRequired"
          >
            Required
          </b-switch>
        </b-field>
      </div>
    </div>

    <div v-if="isQuestionTypeNeedsMoreOptions" class="columns">
      <div class="column"></div>
    </div>

    <div class="columns">
      <div class="column">
        <b-button
          type="is-success"
          size="is-small"
          @click="emitAddQuestion"
        >
          Add this question
        </b-button>

        <b-button
          type="is-danger is-light"
          size="is-small"
          style="margin-left: 12px;"
          @click="$emit('on-click-discard-this-question')"
        >
          Discard this question
        </b-button>
      </div>
    </div>
    <!-- {{ [questionTitle, questionType, isRequired] }} -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      questionTypes: [
        { code: 'SHORT', title: 'Short Answer' },
        { code: 'PARAG', title: 'Paragraph' },
        { code: 'MULTI', title: 'Multiple Choice' },
        { code: 'CHECK', title: 'Checkboxes' },
        { code: 'DROPD', title: 'Dropdown' },
        { code: 'DATE', title: 'Date' },
        { code: 'TIME', title: 'Time' },
      ],
      questionTitle: '',
      questionType: 'SHORT',
      isRequired: true,
      questionConfig: {}
    }
  },

  computed: {
    isQuestionTypeNeedsMoreOptions() {
      return [
        'MULTI',
        'CHECK',
        'DROPD'
      ].includes(this.questionType) 
    }
  },

  methods: {
    emitAddQuestion() {
      this.$emit('on-click-add-question', {
        questionTitle: this.questionTitle,
        questionType: this.questionType,
        isRequired: this.isRequired,
        questionConfig: this.questionConfig
      })
    }
  }
}
</script>
