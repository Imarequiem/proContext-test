<template>
  <div class="right-side">
    <div v-for="listObj of lists" :key="listObj.listName" class="list-card">

      <section class="list-card__info">
        <h2 class="list-card__info__header" @click="listObj.showItems = !listObj.showItems">
          {{ listObj.listName }}
        </h2>
        <button class="list-card__info__button" @click="sorted(listObj.listName)">
          <p v-if="showRandom">Перемешать</p>
          <p v-else>Сортировать</p>
        </button>
      </section>

      <section class="content" v-if="listObj.showItems">
        <div
          v-for="listItems of listObj.items"
          :key="listItems.itemName"
          v-if="!showRandom"
          class="content__color-wrap sorted"
        >
          <template v-for="(i, index) of listItems.count" :key="index">
            <div
              class="item-color"
              :style="{'background-color': listItems.color}"
              @click="listItems.count -= 1"
            />
          </template>
        </div>

        <div v-else class="content__color-wrap random">
            <div
              v-for="(randomItem, index) of randomList"
              :key="index"
              class="item-color"
              :style="{'background-color': randomItem.color}"
              @click="deleteSquare(index), randomItem.count -= 1"
            />
          </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// В этом компоненте столкнулся с последствием неправильно выбранной структуры массива листов, а переделывать уже поздно.
// В общем, всю сложность вызвала кнопка "перемешать", и я не мог понять очень долго как подобраться к массиву листов так, чтобы данные
// продолжали быть реактивными, и чтобы в то же время не мутировать массив листа, но иметь на руках реактивный массив со случайными квадратиками
// с нужным кол-вом цветов и нужным кол-вом самих квадратов, реагирующим на изменения. Придумал решение только таким способом,
// но остался баг, что у каждого листа одинаковые рандомные квадраты появляются
import { ref } from 'vue';
import { useListsStore } from '../stores/list';

const { lists } = useListsStore()

let randomList = ref([])
const showRandom = ref(false)

const sorted = (listName) => {
  if(!showRandom.value) {
    showRandom.value = true
    randomList.value = useListsStore().randomize(listName)
  }
  else {
    randomList.value = []
    showRandom.value = false
  }
}
const deleteSquare = (index) => {
  randomList.value.splice(index, 1)
}
</script>

<style scoped>
@import url('../styles/components/sides.scss');
</style>