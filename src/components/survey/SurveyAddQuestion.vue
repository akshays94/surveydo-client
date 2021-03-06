<template>
  <section style="border: 1px solid lightgray; padding: 18px; margin-bottom: 24px;">
    <div class="columns">
      <div class="column is-8">
        <b-field
          label="Question"
          :type="validationQuestionTitle.type"
          :message="validationQuestionTitle.message">
          <b-input
            placeholder="Question"
            v-model="questionTitle"
            @input="onChangeQuestionTitle"
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
              :key="questionType.code"
            >
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
      <div class="column">
        <component
          :is="questionTypeComponent"
          :is-updating="isUpdating"
          :question-config="questionConfig"
          @on-change-mcq-options="onChangeMCQOptions"
          @on-change-checkboxes-options="onChangeCheckboxesOptions"
          @on-change-dropdown-options="onChangeDropdownOptions"
        ></component>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-button
          type="is-success"
          size="is-small"
          @click="emitAddUpdateQuestionData"
        >
          {{ isUpdating ? 'Update' : 'Add' }} this question
        </b-button>

        <b-button
          type="is-danger is-light"
          size="is-small"
          style="margin-left: 12px;"
          @click="onClickCancelButton"
        >
          {{ isUpdating ? 'Cancel' : 'Discard' }}
        </b-button>
      </div>
    </div>
    <!-- {{ [questionTitle, questionType, isRequired, questionConfig] }} -->
  </section>
</template>

<script>
import SurveyAddQuestionMultipleChoice from '@/components/survey/SurveyAddQuestionMultipleChoice.vue'
import SurveyAddQuestionCheckboxes from '@/components/survey/SurveyAddQuestionCheckboxes.vue'
import SurveyAddQuestionDropdown from '@/components/survey/SurveyAddQuestionDropdown.vue'

export default {
  components: {
    SurveyAddQuestionMultipleChoice,
    SurveyAddQuestionCheckboxes,
    SurveyAddQuestionDropdown
  },

  props: {
    isUpdating: {
      type: Boolean,
      default: false
    },
    updateQuestionIndex: {
      type: Number,
      required: false
    },
    updateQuestionId: {
      type: String,
      required: false
    },
    updateQuestionTitle: {
      type: String,
      required: false
    },
    updateQuestionType: {
      type: String,
      required: false
    },
    updateIsRequired: {
      type: Boolean,
      required: false
    },
    updateQuestionConfig: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      questionTypes: [
        { code: 'SHORT', title: 'Short Answer' },
        { code: 'PARAG', title: 'Paragraph' },
        { code: 'MULTI', title: 'Multiple Choice' },
        { code: 'CHECK', title: 'Checkboxes' },
        { code: 'DROPD', title: 'Dropdown' },
        // { code: 'DATE', title: 'Date' },
        // { code: 'TIME', title: 'Time' },
      ],
      questionTitle: '',
      questionType: 'SHORT',
      isRequired: true,
      questionConfig: {},

      validationQuestionTitle: {
        type: '',
        message: ''
      }
    }
  },

  created() {
    if (this.isUpdating) {
      this.questionTitle = this.updateQuestionTitle
      this.questionType = this.updateQuestionType
      this.isRequired = this.updateIsRequired
      this.questionConfig = this.updateQuestionConfig
    }
  },

  computed: {
    isQuestionTypeNeedsMoreOptions() {
      return [
        'MULTI',
        'CHECK',
        'DROPD'
      ].includes(this.questionType) 
    },

    questionTypeComponent() {
      switch (this.questionType) {        
        case 'MULTI':
          return 'SurveyAddQuestionMultipleChoice'
        
        case 'CHECK':
          return 'SurveyAddQuestionCheckboxes'
        
        case 'DROPD':
          return 'SurveyAddQuestionDropdown'
      }
      return null
    }
  },

  methods: {
    onChangeMCQOptions(mcqConfig) {
      this.questionConfig = mcqConfig
    },

    onChangeCheckboxesOptions(checkboxesConfig) {
      this.questionConfig = checkboxesConfig
    },

    onChangeDropdownOptions(dropdownConfig) {
      this.questionConfig = dropdownConfig
    },

    onChangeQuestionTitle() {
      const validTitleLength = this.questionTitle.trim().length > 0
      if (validTitleLength) {
        this.validationQuestionTitle = {
          type: '',
          message: ''
        }
      }
    },

    emitAddUpdateQuestionData() {
      const invalidTitleLength = this.questionTitle.trim().length === 0

      if (invalidTitleLength) {
        this.validationQuestionTitle = {
          type: 'is-danger',
          message: 'Please add a question'
        }
      } else {
        const questionData = {
          action: 'ADD',
          questionData: {
            question: this.questionTitle,
            question_type: this.questionType,
            is_required: this.isRequired,
            configuration: this.questionConfig
          },
          questionIndex: this.updateQuestionIndex
        };
        if (this.isUpdating) {
          questionData['action'] = 'UPDATE';
          questionData.questionData.id = this.updateQuestionId
        }
        this.$emit('on-click-add-or-update-question', questionData);
      }
    },

    onClickCancelButton() {
      if (this.isUpdating) {
        this.$emit(
          'on-click-cancel-updating-this-question', this.updateQuestionIndex)
      } else {
        this.$emit('on-click-discard-this-question')
      }
    }
  },

  watch: {
    questionType(newValue) {
      if (['SHORT', 'PARAG', 'DATE', 'TIME'].includes(newValue)) {
        this.questionConfig = {}
      }
    }
  }
}
</script>
