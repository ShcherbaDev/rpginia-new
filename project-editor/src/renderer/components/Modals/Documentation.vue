<template>
    <div class="modal_content">
        <div class="modal_body modal_documentation">
            <iframe src="https://shcherbadev.github.io/rpginia/docs/"></iframe>
        </div>
    </div>
</template>

<style>
    .modal_body.modal_documentation {
        min-height: 530px;
        padding: 0;
        position: relative;
    }

    .modal_body.modal_documentation > iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 0;
    }

    @media screen and (max-height: 400px) {
        .modal_body.modal_documentation {
            min-height: 530px;
        }
    }

    @media screen and (min-height: 880px) {
        .modal_body.modal_documentation {
            min-height: 800px;
        }
    }
</style>