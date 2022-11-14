<template>
  <div>
    <v-row>
      <v-col>
        <div class="mt-3 py-4 mb-6">
          <v-avatar color="primary" size="56"
            style="position:absolute; z-index: -1; scale:5; left:40px; top:40px; opacity: 0.2;">
            <v-icon>{{ classIcon }}</v-icon>
          </v-avatar>
          <div>
                <h1 class="text-h4 text-md-h3">
                  {{ title || $t('global.basics.title') }}
                </h1>
                <p class="text-overline">
                  {{ systemClassName }}
                </p>
          </div>
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
        </div>
        <v-content v-for="(description, index) in descriptions">
          <v-divider v-if="index > 0"></v-divider>
          <v-text class="text-body-1">
            {{ description.value }}
          </v-text>
        </v-content>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import classes from "../../assets/classes.json";
import type { DescriptionModel, WhenModel } from '~~/composables/api';


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
  title?: string,
  descriptions?: Array<DescriptionModel>,
  systemClass?: String,
  when?: WhenModel,
  displayOptions?: displayOptions
}

const props = defineProps<Props>()

const classIcon = computed(() => {
  console.log(crmClass.value);
  if (systemClassName.value === t('components.entity.class_missing')) {
    return 'mdi-help';
  } else {
    console.log(classes.find(x => x.crmClass === crmClass.value)?.icon);
    return (classes.find(x => x.crmClass === crmClass.value)?.icon) ?? 'mdi-help';
  }
});


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

function convertStringToDate(dateStr?:string) {
  if(!dateStr) {
    return null;
  }

  console.log('test');

  const moment: Moment = {};

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


const crmClass = computed(() => props.systemClass.substring(props.systemClass.indexOf(':') + 1, props.systemClass.indexOf(' ')))

const systemClassName = computed(
  () => {
    if (props.systemClass) {
      return classes.find(x => x.crmClass === crmClass.value)?.en
    }
    return t('components.entity.class_missing');
  }
)

</script>
