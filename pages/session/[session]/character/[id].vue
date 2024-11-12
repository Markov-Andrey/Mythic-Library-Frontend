<template>
    <div class="p-5">
        <div v-if="loading" class="text-lg text-center text-gray-500">Загрузка...</div>
        <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-else>
            <div class="flex gap-2">
                <div>
                    <!-- Avatar -->
                    <div class="flex justify-center w-[250px] h-[250px]">
                        <img
                            v-if="character.avatar"
                            :src="`${character.avatar}`"
                            alt="avatar"
                            class="w-full h-full rounded shadow-md border-2 border-gray-300 object-cover"
                        >
                        <div v-else class="rounded bg-gray-300 flex items-center justify-center text-2xl">
                            N/A
                        </div>
                    </div>
                    <!-- Character Info -->
                    <div class="text-center">
                        <h1 class="text-2xl font-semibold">{{ character.name }}</h1>
                        <p class="text-gray-600">{{ character.info }}</p>
                        <p v-if="character.is_npc" class="text-sm text-yellow-500">NPC</p>
                    </div>

                    <!-- Stats -->
                    <div class="flex gap-2 justify-around text-center text-sm font-medium text-gray-700 mt-4">
                        <div>
                            <p>Здоровье</p>
                            <p class="text-lg font-semibold">{{ character.health }} / {{ character.max_health }}</p>
                        </div>
                        <div>
                            <p>Опыт</p>
                            <p class="text-lg font-semibold">{{ character.experience }}</p>
                        </div>
                    </div>

                    <!-- Attributes -->
                    <div class="mt-6 space-y-2">
                        <h2 class="text-lg font-medium text-gray-800">Атрибуты</h2>
                        <ul class="grid gap-4 text-gray-700">
                            <li v-for="(value, key) in character.attributes" :key="key" class="flex justify-between">
                                <span>{{ key }}</span>
                                <span class="font-semibold">{{ value }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="grid h-full">
                    <div role="tablist" class="tabs tabs-lifted">
                        <a
                            role="tab"
                            class="tab text-xl font-semibold"
                            :class="{ 'tab-active': activeTab === 'inventory' }"
                            @click="switchTab('inventory')"
                        >
                            Инвентарь ({{ character.inventory_with_items.length }})
                        </a>
                        <a
                            role="tab"
                            class="tab text-xl font-semibold"
                            :class="{ 'tab-active': activeTab === 'abilities' }"
                            @click="switchTab('abilities')"
                        >
                            Способности ({{ character.abilities_with_details.length }})
                        </a>
                    </div>

                    <div v-if="activeTab === 'inventory'" class="mb-8">
                        <div v-for="item in character.inventory_with_items" :key="item.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
                            <div class="flex items-center space-x-4">
                                <div class="w-16 h-16">
                                    <img
                                        v-if="item.image"
                                        :src="item.image"
                                        alt="Item image"
                                        class="w-full h-full object-cover rounded-full"
                                    />
                                    <div v-else class="w-full h-full bg-gray-300 rounded-full"></div>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-medium">{{ item.name }}</h3>
                                    <p class="text-sm text-gray-600">{{ item.description }}</p>
                                    <div class="mt-2 text-sm text-gray-500">
                                        <span class="font-semibold">Тип:</span> {{ item.type }}
                                    </div>
                                    <div class="mt-2 text-sm text-gray-500">
                                        <span class="font-semibold">Количество:</span> {{ item.quantity }}
                                    </div>
                                    <div v-if="item.add_properties" class="mt-2 text-sm text-gray-500">
                                        <span class="font-semibold">Дополнительные свойства:</span>
                                        <div class="ml-5" v-for="(value, key) in JSON.parse(item.add_properties)" :key="key">
                                            {{ key }}: {{ value }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="activeTab === 'abilities'" class="mb-8">
                        <div
                            v-for="ability in character.abilities_with_details"
                            :key="ability.id"
                            class="bg-white rounded-lg shadow-md p-4 mb-4"
                        >
                            <div class="flex items-center space-x-4">
                                <div class="w-16 h-16">
                                    <img
                                        v-if="ability.image"
                                        :src="ability.image"
                                        alt="Ability image"
                                        class="w-full h-full object-cover rounded-full"
                                    />
                                    <div v-else class="w-full h-full bg-gray-300 rounded-full"></div>
                                </div>

                                <div class="flex-1">
                                    <h3 class="text-lg font-medium">{{ ability.name }}</h3>
                                    <p class="text-sm text-gray-600">{{ ability.description }}</p>
                                    <div class="mt-2 text-sm text-gray-500">
                                        <span class="font-semibold">Тип:</span> {{ ability.type }}
                                    </div>

                                    <div v-if="ability.add_properties && JSON.parse(ability.add_properties).length > 0">
                                        <span class="font-semibold">Дополнительные свойства:</span>
                                        <div class="ml-5" v-for="(value, key) in JSON.parse(ability.add_properties)" :key="key">
                                            {{ key }}: {{ value }}
                                        </div>
                                    </div>

                                    <div v-if="ability.parameters && Object.keys(ability.parameters).length > 0" class="mt-2 text-sm text-gray-500">
                                        <span class="font-semibold">Параметры:</span>
                                        <div v-for="(value, key) in ability.parameters" :key="key">
                                            <strong>{{ key }}:</strong> {{ value }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRuntimeConfig } from '#app';

const character = ref([]);
const loading = ref(true);
const error = ref(null);
const route = useRoute();
const activeTab = ref('inventory');
const config = useRuntimeConfig();

const fetchCharacterData = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
        const response = await axios.get(`${config.public.apiBase}/api/character/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        character.value = response.data;
    } catch (err) {
        error.value = 'Ошибка при загрузке данных.';
    } finally {
        loading.value = false;
    }
};

function switchTab(tab) {
    activeTab.value = tab;
}

onMounted(() => {
    const characterId = route.params.id;
    fetchCharacterData(characterId);
});

watchEffect(() => {
    if (character.value?.name) {
        useHead({
            title: character.value.name,
        });
    }
});
</script>
