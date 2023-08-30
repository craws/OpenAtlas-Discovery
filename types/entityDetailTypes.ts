import { Component } from 'nuxt/dist/app/compat/capi';
import { LinkedPlacesModelRelations } from '~~/composables/api';

export interface relationGroup {
  relationType: string,
  relations: LinkedPlacesModelRelations[]
}

export interface DetailItem{
  id:string,
  label:string,
  subheader?:string
}

export interface DetailTab {
  title: string;
  component: string | Component;
  props: any;
}
