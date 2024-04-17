<template>
  <div class="left-side">
    <ul
      v-for="listObj of lists"
      class="list-wrap"
      :key="listObj.listName"
      >

      <section class="header-wrap">
        <arrow-button
          @click="showList(listObj.listName)"
          :state="listObj.showItems"
          />
        <label :for="listObj.listName">
          <input
            type="checkbox"
            name=""
            :id="listObj.listName"
            @click="checkedList($event.currentTarget, listObj.listName)"
          />
          {{ listObj.listName }}
        </label>
      </section>

      <li
        :class="listObj.listName + '-li'"
        v-for="listItems of listObj.items"
        v-show="listObj.showItems"
        >
        <section class="content-wrap">
          <input
            type="checkbox"
            :class="listObj.listName + '-input'"
            @click="checkedList($event.currentTarget, listObj.listName)"
            />
          <label :for="listObj.listName + '-input-' + listItems.itemName">
            {{ listItems.itemName }}
          </label>
        </section>

        <section class="actions-wrap">
          <input-count v-model="listItems.count" :min="0"/>
          <input-color v-model="listItems.color" />
        </section>
      </li>
    </ul>
  </div>
</template>

<script setup>
import ArrowButton from './UI/ArrowButton.vue';
import InputColor from './UI/InputColor.vue';
import InputCount from './UI/InputCount.vue';

import { useListsStore } from '../stores/list';

const { lists } = useListsStore()

const showList = (targetName) => {
  // Мы итерируемся по массиву листов, и получаем каждый лист.
  // И, на каждой итерации по массиву листов мы ищем тот элемент, у которого
  // совпадают имена с именем в той карточке, где мы нажали на стрелку,
  // и меняем у каждого айтема этого листа внутренне значение showItems на противоположное
  lists.find(
    (i) => i.listName === targetName
    ? i.showItems = !i.showItems
    : null
  )
}
const checkedList = ($event, checkboxList) => {
  // Cоздаём массив HTMLCollection с инпутами глобально в ф-ции
  const checkboxes = document.getElementsByClassName(checkboxList + '-input')
  // Проверка на класснэйм
  // Я проверяю, есть ли у переданного события класснэйм(он есть только у дочернеих чекбоксов(у айтемов)) для того, чтобы понимать
  // по дочернему ли чекбоксу был клик, чтобы знать, как манипулировать с данными и DOM дальше
  if(!$event.className) {
    // Object.values служит для того, чтобы итерироваться по массиву, а не HTMLCollection, и forEach'ом проходимся по каждому элементу
    // Смотрим на состояние checked, и меняет его по условию
    Object.values(checkboxes).forEach((item) => {
      $event.checked ? item.checked = true : item.checked = false
    })
    // Меняю тип родительского инпута на чекбокс, тк, возможно, он ранее был радиокнопкой, если был до "Выбрать все" нажат хоть один инпут
    document.getElementById(`${checkboxList}`).type = 'checkbox'
    return
  }
  // Если if не выполнился, то я понимаю, что клик был на дочерний чекбокс, и я его получаю
  const parent = document.getElementById(`${checkboxList}`)

  // Получаем булевое значение проходясь по массиву и проверкой checked === true
  const onceChecked = Object.values(checkboxes).every((checkbox) => checkbox.checked === true)

  // Если в переменной не true, то меняем инпут листа на радио, чтобы отобразить его как в ТЗ, и сразу делаем checked true, а иначе род. инпут = чекбокс
  // Остался баг, что кнопка не меняет состояние если, например, айтем сделать checked и потом обратно, то тайп не поменяет
  if(!onceChecked) {
    parent.type = 'radio'
    parent.checked = true
  }
  else parent.type = 'checkbox'
}
</script>

<style scoped>
@import url('../styles/components/sides.scss');
</style>
