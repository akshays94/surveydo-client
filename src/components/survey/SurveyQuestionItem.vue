<template>
  <section class="item-box">
    <div class="item-box-actions" v-if="isShowActions">
      <div @click="$emit('on-click-update-question', questionIndex)">
        <b-icon
          class="item-box-actions--item"
          icon="pencil-alt"
          size="is-small"
        >
        </b-icon>
      </div>

      <div @click="$emit('on-click-delete-question', questionIndex)">
        <b-icon class="item-box-actions--item" icon="trash-alt" size="is-small">
        </b-icon>
      </div>
    </div>

    <div class="item-box--title">
      {{ questionTitle }} <span v-if="isRequired" class="is-required">*</span>
    </div>

    <div>
      <div v-if="questionType === 'SHORT'">
        <b-input v-model="shortAnswer" @input="shortAnswerChange()"></b-input>
      </div>

      <div v-if="questionType === 'PARAG'">
        <b-input
          maxlength="200"
          type="textarea"
          v-model="paragraphAnswer"
          @input="paragraphAnswerChange"
        ></b-input>
      </div>

      <div v-if="questionType === 'MULTI'">
        <b-field v-for="option in questionConfig.options" :key="option.id">
          <b-radio
            v-model="mcqAnswer"
            name="radio"
            :native-value="{ id: option.id, title: option.title }"
            @input="mcqAnswerChange"
          >
            {{ option.title }}
          </b-radio>
        </b-field>

        <b-field v-if="questionConfig.isAddOther" label="Other">
          <b-input
            placeholder="Other"
            v-model="otherAnswer"
            @input="otherAnswerChange"
          ></b-input>
        </b-field>
      </div>

      <div v-if="questionType === 'CHECK'">
        <b-field v-for="option in questionConfig.options" :key="option.id">
          <b-checkbox
            name="radio"
            :native-value="{ id: option.id, title: option.title }"
            v-model="checkboxAnswer"
            @input="checkboxAnswerChange"
          >
            {{ option.title }}
          </b-checkbox>
        </b-field>

        <b-field v-if="questionConfig.isAddOther" label="Other">
          <b-input
            placeholder="Other"
            v-model="otherAnswer"
            @input="otherAnswerChange"
          ></b-input>
        </b-field>
      </div>

      <div v-if="questionType === 'DROPD'">
        <b-select
          placeholder="Select"
          v-model="dropdownAnswer"
          @input="dropdownAnswerChange"
        >
          <option
            v-for="option in questionConfig.options"
            :value="option.title"
            :key="option.id"
          >
            {{ option.title }}
          </option>
        </b-select>
      </div>

      <!-- <div v-if="questionType === 'DATE'">
        <b-datepicker
          v-model="selectedDate"
          :show-week-number="false"
          :locale="undefined"
          placeholder="Click to select..."
          icon="calendar-plus"
          trap-focus
        >
        </b-datepicker>
      </div>

      <div v-if="questionType === 'TIME'"></div> -->
    </div>
  </section>
</template>

<script>
export default {
  props: {
    questionIndex: {
      type: Number,
      required: true,
    },
    questionId: {
      type: String,
      required: false, // TODO: update this ...
    },
    questionTitle: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      required: true,
    },
    questionConfig: {
      type: Object,
      required: true,
    },
    isShowActions: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      selectedDate: new Date(),

      shortAnswer: "",
      paragraphAnswer: "",
      mcqAnswer: {},
      checkboxAnswer: [],
      dropdownAnswer: "",
      otherAnswer: "",
    };
  },

  methods: {
    shortAnswerChange() {
      this.$emit("on-answer-update", {
        answer: this.shortAnswer,
        questionId: this.questionId,
        questionType: this.questionType,
      });
    },

    paragraphAnswerChange() {
      this.$emit("on-answer-update", {
        answer: this.paragraphAnswer,
        questionId: this.questionId,
        questionType: this.questionType,
      });
    },

    mcqAnswerChange() {
      this.$emit("on-answer-update", {
        answer: this.mcqAnswer,
        questionId: this.questionId,
        otherAnswer: this.otherAnswer,
        questionType: this.questionType,
      });
    },

    checkboxAnswerChange() {
      this.$emit("on-answer-update", {
        answer: this.checkboxAnswer,
        questionId: this.questionId,
        otherAnswer: this.otherAnswer,
        questionType: this.questionType,
      });
    },

    dropdownAnswerChange() {
      this.$emit("on-answer-update", {
        answer: this.dropdownAnswer,
        questionId: this.questionId,
        questionType: this.questionType,
      });
    },

    otherAnswerChange() {
      this.$emit("on-answer-update", {
        answer:
          this.questionType === "MULTI" ? this.mcqAnswer : this.checkboxAnswer,
        questionId: this.questionId,
        otherAnswer: this.otherAnswer,
        questionType: this.questionType,
      });
    },
  },
};
</script>

<style scoped>
.item-box {
  border: 1px solid lightgray;
  padding: 24px 24px 24px 24px;
  margin-bottom: 24px;
  position: relative;
}

.item-box-actions {
  position: absolute;
  display: flex;
  top: 24px;
  right: 24px;
}

.item-box-actions--item {
  color: lightgray;
  cursor: pointer;
  margin-left: 12px;
}

.item-box-actions--item:hover {
  color: gray;
}

.item-box--title {
  margin-bottom: 12px;
  font-weight: bold;
}

.is-required {
  color: rgb(247, 104, 104);
}
</style>
