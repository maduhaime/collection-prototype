import { ref, computed, type Ref, type ComputedRef } from 'vue';

type Item = {
  id: number;
  label: string;
};

type ChainLinkName = string;

type ChainLink<T> = {
  name: ChainLinkName;
  input: T[];
  condition: Ref<string>;
  output: ComputedRef<T[]>;
};

type Chain<T> = {
  [key: string]: ChainLink<T>;
};

// console.log(initial);

class ScopeChain<T> {
  #chain: Chain<T>;

  constructor(linkNames: ChainLinkName[], firstInput: Ref<T[]>) {
    this.#chain = {};

    let previous: T[] = firstInput.value;

    linkNames.forEach((linkName) => {
      const input = previous;
      const chainLink: ChainLink<T> = {
        name: linkName,
        input: input,
        condition: ref(`Condition for ${linkName}`),
        output: computed(() => {
          console.log(`Output ${this.#chain[linkName].condition.value}`);
          const items: T[] = input;
          return items.slice(0, -2);
        }),
      };
      this.#chain[linkName] = chainLink;
      previous = this.#chain[linkName].output.value;
    });
  }

  get chain(): Chain<T> {
    return this.#chain;
  }
}

const items: Item[] = [];

for (let i: number = 0; i < 15; i++) {
  const item = {
    id: i,
    label: `Label ${i}`,
  };
  items.push(item);
}

const initial: Ref<Item[]> = ref(items);
const names: ChainLinkName[] = ['level1', 'level2', 'level3', 'level4', 'level5'];

const chain: Chain<Item> = new ScopeChain<Item>(names, initial).chain;
chain.length;

for (const prop in chain) {
  console.log(`${chain[prop].name} ------------------------------`);
  console.log(chain[prop].input.length);
}

items.push({ id: 20, label: 'Label 20' });
items.push({ id: 21, label: 'Label 21' });
items.push({ id: 22, label: 'Label 22' });

for (const prop in chain) {
  console.log(`${chain[prop].name} ==============================`);
  console.log(chain[prop].input.length);
}
