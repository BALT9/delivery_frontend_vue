<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UserInterface } from '../../../../interface/User.interface';
import { Badge, Button, Column, DataTable, Dialog, Dropdown, InputText } from 'primevue';
import usersService from '../../../../services/users.service';


const users = ref<UserInterface[]>([]);

const userDataBlank = {
    name: '',
    email: '',
    password: '',
    role: ''
}

const user = ref<UserInterface>({
    ...userDataBlank
});

const roles = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'CUSTOMER', value: 'CUSTOMER' }
]

const visible = ref<boolean>(false);

async function crearUser() {
    try {
        if (user.value.id) {

            const payload: any = {
                name: user.value.name,
                email: user.value.email,
                password: user.value.password,
                role: user.value.role
            }

            if (user.value.password) {
                payload.password = user.value.password;
            }

            await usersService.update(user.value.id, payload);

            listarUsuarios();
            user.value = {...userDataBlank};
            visible.value = false;

        } else {
            const res = await usersService.store(user.value);
            console.log(res.data);
            visible.value = false;
            listarUsuarios()
            user.value = { ...userDataBlank }
        }
    } catch (error) {
        console.log(error);
    }
}

function editUser(dataUser: UserInterface) {
    visible.value = true;
    user.value = dataUser;
}
async function confirmDeleteUser(dataUser: UserInterface) {
    if (dataUser.id) {
        const res = await usersService.delete(dataUser.id);
        console.log(res);
        listarUsuarios();
    }
}

async function listarUsuarios() {
    const res = await usersService.index();
    console.log(res.data);
    users.value = res.data;
}

onMounted(() => {
    listarUsuarios()
})

function getRoleSeverity(role: string) {
    switch (role) {
        case 'ADMIN':
            return 'info'
        case 'CUSTOMER':
            return 'warn'
        default:
            return 'info'
    }
}

</script>

<template>

    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="name" class="font-semibold w-24">Nombre</label>
            <InputText v-model="user.name" id="name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText v-model="user.email" id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="password" class="font-semibold w-24">Contraseña</label>
            <InputText v-model="user.password" id="password" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="role" class="font-semibold w-24">Rol</label>

            <Dropdown id="role" v-model="user.role" :options="roles" optionLabel="label" optionValue="value"
                placeholder="Selecciona un rol" class="flex-auto" />
        </div>

        <!-- {{ user }} -->
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Crear" @click="crearUser()"></Button>
        </div>
    </Dialog>

    <div class="card">
        <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-zinc-200 mb-5">
            <div class="space-y-1">
                <h2 class="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">Gestión de Usuarios</h2>
                <p class="text-xs text-zinc-500 font-medium">Administra las cuentas de usuario, sus roles y accesos al
                    sistema.</p>
            </div>

            <!-- Acción Principal integrada fuera del Toolbar para un look más limpio -->
            <Button label="Nuevo Usuario" icon="pi pi-plus" class="!text-xs !py-2.5 !px-4" @click="visible = true" />
        </div>

        <DataTable :value="users" tableStyle="min-width: 50rem">
            <Column header="#">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="role" header="Rol">
                <template #body="slotProps">
                    <Badge :value="slotProps.data.role" :severity="getRoleSeverity(slotProps.data.role)" />
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" type="button" variant="outlined" rounded class="mr-2"
                        @click="editUser(slotProps.data)" />
                    <Button icon="pi pi-trash" variant="outlined" rounded severity="danger"
                        @click="confirmDeleteUser(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>

</template>