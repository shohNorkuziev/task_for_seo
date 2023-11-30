<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<form action="action-add.php">
<table>
  <h     1>Добавить покупку</h>
  <tr>
    <td>Название:</td>
    <td><input type="text" name="titleInput"></td>
  </tr>
  <tr>
    <td>Цена:</td>
    <td><input type="number" name="priceInput"></td>
  </tr>
  <tr>
    <td>Категории:</td>
    <td>
      <select name="category" name="typeInput">
        <option value="1">Еда</option>
      </select>
      <button type="submit">Добавить</button>
    </td>
  </tr>
</table> 
</form>
</body>
</html>