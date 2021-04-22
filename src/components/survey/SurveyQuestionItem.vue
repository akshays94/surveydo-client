<template>
  <section class="item-box">
    <div class="item-box--title">
      {{ questionTitle }} <span v-if="isRequired" class="is-required">*</span>
    </div>

    <div>
      <div v-if="questionType === 'SHORT'">
        <b-input></b-input>
      </div>

      <div v-if="questionType === 'PARAG'">
        <b-input maxlength="200" type="textarea"></b-input>
      </div>

      <div v-if="questionType === 'MULTI'">
        <b-field
          v-for="option in questionConfig.options"
          :key="option.id"
        >
          <b-radio
            v-model="radio"
            name="radio"
            :native-value="option.id"  
          >
            {{ option.title }}
          </b-radio>
        </b-field>

        <b-field v-if="questionConfig.isAddOther" label="Other">
          <b-input placeholder="Other"></b-input>
        </b-field>
      </div>

      <div v-if="questionType === 'CHECK'">
        <b-field
          v-for="option in questionConfig.options"
          :key="option.id"
        >
          <b-checkbox
            v-model="checkboxGroup"
            name="radio"
            :native-value="option.id"  
          >
            {{ option.title }}
          </b-checkbox>
        </b-field>

        <b-field v-if="questionConfig.isAddOther" label="Other">
          <b-input placeholder="Other"></b-input>
        </b-field>
      </div>

      <div v-if="questionType === 'DROPD'">
        <b-select placeholder="Select">
          <option
            v-for="option in questionConfig.options"
            :value="option.id"
            :key="option.id">
            {{ option.title }}
          </option>
        </b-select>
      </div>

      <div v-if="questionType === 'DATE'">
        <b-datepicker
          v-model="selectedDate"
          :show-week-number="false"
          :locale="undefined"
          placeholder="Click to select..."
          icon="calendar-today"
          trap-focus>
        </b-datepicker>
      </div>

      <div v-if="questionType === 'TIME'">

      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    questionTitle: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      required: true
    },
    isRequired: {
      type: Boolean,
      required: true
    },
    questionConfig: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      radio: '',
      checkboxGroup: [],
      selectedDate: new Date()
    }
  }
}
</script>

<style scoped>
.item-box {
  border: 1px solid black;
  padding: 24px;
  margin-bottom: 24px;
}

.item-box--title {
  margin-bottom: 12px;
}

.is-required {
  color: rgb(247, 104, 104)
}
</style>
