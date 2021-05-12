<template>
  <h4>Мои акты</h4>
  <hr />
  <table>
    <thead>
      <tr>
        <th>№ п/п</th>
        <th>Наименование объекта</th>
        <th>Номер акта</th>
        <th>Дата составления</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>{{ getYearArray }}</td>
        <td>Eclair</td>
        <td>$0.87</td>
      </tr>
      <tr>
        <td>Alan</td>
        <td>Jellybean</td>
        <td>$3.76</td>
      </tr>
      <tr>
        <td>Jonathan</td>
        <td>Lollipop</td>
        <td>$7.00</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DashBoard",

  data() {
    return {
      akts: null,
    };
  },

  mounted() {
    this.akts = JSON.parse(localStorage.getItem("AKT_PGES_AKTS"));
  },

  computed: {
    getYearArray() {
      if (this.akts) {
        return Object.keys(this.akts);
      } else {
        return null;
      }
    },
  },
};
</script>

<style></style>
