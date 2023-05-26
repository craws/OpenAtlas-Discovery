<template>
  <v-row v-if="start || end">
    <v-col>
      <p>{{ $t("components.entity.basics.start") }}: {{ start }}</p>
    </v-col>
    <v-spacer />
    <v-col>
      <p>{{ $t("components.entity.basics.end") }}: {{ end }}</p>
    </v-col>
    <v-spacer />
    <v-spacer />
  </v-row>
  <div v-else-if="props.displayOptions?.time?.showUnknownIfMissing">
    <p>{{ $t("components.when-display.no-dates") }}</p>
  </div>
</template>

<script lang="ts" setup>
import { type DateTimeFormatOptions } from "@intlify/core-base";
import { useI18n } from "vue-i18n";

import {
  type LinkedPlacesModelWhen,
  type LinkedPlacesModelWhenStart,
} from "~~/composables/api";

const { t } = useI18n();

interface displayOptions {
  time: {
    showTime?: boolean;
    showSymbolForMissingDate?: boolean;
    showUnknownIfMissing: boolean;
  };
}

interface Props {
  loading?: boolean;
  when?: LinkedPlacesModelWhen;
  displayOptions?: displayOptions;
}

const props = defineProps<Props>();

const start = computed(() => {
  if (!props.when?.timespans) {
    return undefined;
  }
  const timespan = props.when.timespans[0];
  if (!timespan || !timespan.start) {
    return t("global.basics.unknown");
  }
  const { earliest, latest } = getEarliestAndLatestDateFromTimeDetail(
    timespan.start
  );

  return generateCombinedDateString(earliest, latest);
});
const end = computed(() => {
  if (!props.when?.timespans) {
    return undefined;
  }
  const timespan = props.when.timespans[0];
  if (!timespan || !timespan.end) {
    return t("global.basics.unknown");
  }

  const { earliest, latest } = getEarliestAndLatestDateFromTimeDetail(
    timespan.end
  );

  return generateCombinedDateString(earliest, latest);
});

function getEarliestAndLatestDateFromTimeDetail(
  td: LinkedPlacesModelWhenStart
): { earliest?: string; latest?: string } {
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };
  return {
    earliest: convertStringToDate(td.earliest)?.toLocaleString(
      undefined,
      options
    ),
    latest: convertStringToDate(td.latest)?.toLocaleString(undefined, options),
  };
}

function generateCombinedDateString(
  earliest?: string,
  latest?: string,
  seperator = "-"
): string | null {
  if (earliest && latest) {
    return earliest + " " + seperator + " " + latest;
  } else if (earliest) {
    return earliest;
  } else if (latest) {
    return latest;
  }

  return null;
}

function convertStringToDate(dateStr?: string): Date | null {
  if (!dateStr) {
    return null;
  }

  const date = dateStr.split("T")[0].split("-");
  const time = dateStr.split("T")[1].split(":");

  return new Date(
    Number(date[0]),
    Number(date[1]),
    Number(date[2]),
    Number(time[0]),
    Number(time[1]),
    Number(time[2])
  );
}
</script>
