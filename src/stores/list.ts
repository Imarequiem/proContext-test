import { defineStore } from "pinia";
import { ref } from "vue";
import { getRandomInt } from "../global/functions/randomInt";

export const useListsStore = defineStore("useListsStore", () => {
  const lists = ref([
    {
      listName: 'List 1',
      showItems: true,
      items: [
        {
          itemName: 'Item 1',
          count: 4,
          color: "#F6A6EC",
          id: 1,
        },
        {
          itemName: 'Item 2',
          count: 10,
          color: "#AED8EE",
          id: 2,
        },
        {
          itemName: 'Item 3',
          count: 12,
          color: "#E9FF9D",
          id: 3,
        },
        {
          itemName: 'Item 4',
          count: 25,
          color: "#C0D3DC",
          id: 4,
        },
      ],
    },
    {
      listName: 'List 2',
      showItems: true,
      items: [
        {
          itemName: 'Item 1',
          count: 54,
          color: "#F6A6EC",
          id: 1,
        },
        {
          itemName: 'Item 2',
          count: 1,
          color: "#AED8EE",
          id: 2,
        },
        {
          itemName: 'Item 3',
          count: 0,
          color: "#E9FF9D",
          id: 3,
        },
        {
          itemName: 'Item 4',
          count: 33,
          color: "#C0D3DC",
          id: 4,
        },
      ],
    },
    {
      listName: 'List 3',
      showItems: true,
      items: [
        {
          itemName: 'Item 1',
          count: 20,
          color: "#F6A6EC",
          id: 1,
        },
        {
          itemName: 'Item 2',
          count: 6,
          color: "#AED8EE",
          id: 2,
        },
        {
          itemName: 'Item 3',
          count: 10,
          color: "#E9FF9D",
          id: 3,
        },
        {
          itemName: 'Item 4',
          count: 0,
          color: "#C0D3DC",
          id: 4,
        },
      ],
    },
    {
      listName: 'List 4',
      showItems: true,
      items: [
        {
          itemName: 'Item 1',
          count: 12,
          color: "#F6A6EC",
          id: 1,
        },
        {
          itemName: 'Item 2',
          count: 56,
          color: "#AED8EE",
          id: 2,
        },
        {
          itemName: 'Item 3',
          count: 30,
          color: "#E9FF9D",
          id: 3,
        },
        {
          itemName: 'Item 4',
          count: 22,
          color: "#C0D3DC",
          id: 4,
        },
      ],
    },
    {
      listName: 'List 5',
      showItems: true,
      items: [
        {
          itemName: 'Item 1',
          count: 11,
          color: "#F6A6EC",
          id: 1,
        },
        {
          itemName: 'Item 2',
          count: 0,
          color: "#AED8EE",
          id: 2,
        },
        {
          itemName: 'Item 3',
          count: 2,
          color: "#E9FF9D",
          id: 3,
        },
        {
          itemName: 'Item 4',
          count: 3,
          color: "#C0D3DC",
          id: 4,
        },
      ],
    },
  ])


  function randomize(listName: string) {
    /**
    * Cоздаём массив для хранения рандомных квадратиков
    * и прежде, чем его изменять очищаем, чтобы его значения не множились
    */
    let randomItems = ref([])
    randomItems.value = []

    // Узнаём нужный нам индекс элемента от названия родителя(листа айтемов)
    const listIndex = lists.value.findIndex((i) => {
      if(i.listName === listName) return i
    })
    /**
     * Формируем массив квадратиков
     * Берём каждый айтем и делаем из него массив айтемов, длина которого равна item.count
     * Пример
     * {
     *   itemName: 'test',
     *   count: 3,
     *   color: '#C0D3DC',
     *   checked: false,
     *   id: 4,
     * }
     *
     * Из такого объекта мы получим массив: [item, item, item]
     *
     * И так с каждым айтемом
     *
     * В итоге мы получим массив массивов (массив массивов айтемом), через flat делаем его однородным
     */
    const squares = lists.value[listIndex].items.map((item) => {
      return Array.from({ length: item.count }).map(() => item)
    }).flat(1);

    // Сюда будем складировать наши квадратики
    const result = [];

    // Здесь все индексы массива squares.
    // Нужен нам этот массив для того,
    // чтобы понимать по индексу какие айтемы ещё не попали в result
    const indexes = squares.map((_, index) => index);

    // Тут мы проходимся по массив индексов,
    // Будем брать рандомный индекс и брать по нему айтем из массива squares, класть в result
    // И сразу же будем удалять этот индекс из массива indexes, чтобы он больше не брался
    // Таким образом массив будет постепенно уменьшаться, пока не станет равен 0
    for (let index = indexes.length; index > 0; index--) {
      // Берём рандомный индекс
      const randomIndex = getRandomInt(indexes.length)

      // Кладём в result айтем по этому рандомному индексу
      result.push(squares[indexes[randomIndex]]);
      // И удаляем его, чтобы больше его не брать
      indexes.splice(randomIndex, 1);
    }

    // Получаем массив с перемешанными квадратиками
    // @ts-ignore: Unreachable code error
    randomItems.value = result;
    return randomItems.value
  }
  return { lists, randomize }
})