<template>
  <v-row>
    <v-col>
      <p> {{$t('components.entity.basics.start')}}: {{ start }} </p>
    </v-col>
    <v-spacer/>
    <v-col>
      <p> {{$t('components.entity.basics.end')}}: {{ end }} </p>
    </v-col>
    <v-spacer/>
    <v-spacer/>
  </v-row>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { WhenModel } from '~~/composables/api';

const { t } = useI18n();


interface displayOptions {
  time: {
    showTime?: boolean,
    showSymbolForMissingDate?: boolean,
    showUnknownIfMissing: boolean,
  }
}


interface Props {
  loading?: boolean,
  when?: WhenModel,
  displayOptions?: displayOptions
}

const props = defineProps<Props>()

const start = computed(() => {
  const timespan = props?.when?.timespans[0];
  if(!timespan || !timespan.start){
    return t('global.basics.unknown');
  }
  return (timespan.start.earliest ?? '?') + ' - ' + (timespan.start.latest ?? '?');
} )
const end = computed(() => {
  const timespan = props?.when?.timespans[0];
  if(!timespan || !timespan.end){
    return t('global.basics.unknown');
  }
  return (timespan.end.earliest ?? '?') + ' - ' + (timespan.end.latest ?? '?');
})

interface Moment {
  date?: {
    year?: string,
    month?: string,
    day?: string,
  }
  time?: {
    hour?: string,
    minute?: string,
    second?: string,
  }
}

const moment: Moment = {};


function convertStringToDate(dateStr?:string) {
  if(!dateStr) {
    return null;
  }

  console.log('test');

  const jsDate = new Date()

  const datePart = dateStr.split('T')[0].split('-');
  const time = dateStr.split('T')[1].split(':');

  console.log(datePart);
  console.log(time);

  moment.date.year = datePart[0];
  moment.date.month = datePart[1];
  moment.date.day = datePart[2];

  moment.time.hour = time[0];
  moment.time.minute = time[1];
  moment.time.second = time[2];

  return moment;

  //  return new Date(datePart[0], datePart[1], datePart[2], time[0], time[1], time[2]);
}

function getStringDateFromMoment(moment: Moment, seperator?: string, format?:string){
  let dateString = '';

  return moment.date.year;
}


</script>
