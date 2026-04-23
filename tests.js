// 1. Проверка базового статуса и времени
pm.test("Статус 200 и быстрый ответ", function () {
    pm.response.to.have.status(200);
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Схема для массива объектов
const schema = {
    "type": "array", // Указываем, что ждем список
    "items": {       // Правила для каждого элемента внутри списка
        "type": "object",
        "required": ["userId", "id", "title", "body"],
        "properties": {
            "userId": { "type": "number" },
            "id": { "type": "number" },
            "title": { "type": "string" },
            "body": { "type": "string" }
        }
    }
};

pm.test("Схема ответа валидна (массив объектов корректен)", function () {
    pm.response.to.have.jsonSchema(schema);
});


// 3. Сохранение данных в переменную для следующего шага
const jsonData = pm.response.json();
pm.globals.set("current_post_id", jsonData.id);
