<template>
  <section>
    <table>
      <thead>
        <tr>
          <th width="5%">#</th>
          <th width="10%">Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in this.records" :key="row.id">
          <td>{{ index + 1 }}</td>
          <td>{{ row.amount | currencyFilter() }}</td>
          <td>{{ new Date(row.date).toLocaleString().slice(0, 10) }}</td>
          <td>
            {{ categories.find((c) => c.id === row.categoryId).title }}
          </td>
          <td>
            <span
              class="white-text badge"
              :class="{
                red: row.type === 'outcome',
                green: row.type === 'income',
              }"
              >{{ row.type === "outcome" ? "Расход" : "Доход" }}</span
            >
          </td>
          <td>
            <button
              v-tooltip="'Подробнее'"
              class="btn-small btn"
              @click="$router.push(`/detail-record/${row.id}`)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>


<script>
export default {
  props: ['records', 'categories'],
}
</script>
