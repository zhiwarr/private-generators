<template>
    <!-- Begin page -->
    <main class="h-100 has-header has-footer">

         <div class="main-container container" style="min-height: 184px;">

            <!-- carousel category -->
            <div class="row">
                <div class="col-12">
                    <!-- category carousel -->
                    <div class="row">
                        <div class="container mb-3 px-0">
                                <div class="swiper-wrapper" id="swiper-wrapper-136d4dad92255549" aria-live="polite" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                                        <router-link  :to="{name:'dashboard'}">
                                    <div class="  text-center" role="group" aria-label="1 / 10">
                                        <!-- add active class when item category need active need to show -->

                                        <div class="card shadow-sm mb-2">
                                            <div class="card-body">
                                                <div class="h2 mb-0">
                                                    <i class="bi bi-house"></i>
                                                </div>
                                        <p class="small">ماڵەوە</p>
                                            </div>
                                        </div>
                                    </div>
                                        </router-link>
                                        <router-link :to="{name:'admins'}">
                                    <div class="swiper-slide text-center swiper-slide-next" role="group" aria-label="2 / 10">
                                        <div class="card shadow-sm mb-2">
                                            <div class="card-body">
                                                <div class="h2 mb-0">
                                                    <i class="bi bi-person"></i>
                                                </div>
                                        <p class="small">ئەدمینەکان</p>
                                            </div>
                                        </div>
                                    </div>
</router-link>
                                        <router-link :to="{name:'users'}">
                                    <div class="swiper-slide text-center" role="group" aria-label="3 / 10">
                                        <div class="card shadow-sm mb-2">
                                            <div class="card-body">
                                                <div class="h2 mb-0">
                                                    <i class="bi bi-people"></i>
                                                </div>
                                        <p class="small">بەژداربوان</p>
                                            </div>
                                        </div>
                                    </div>
                                        </router-link>
                                        <router-link :to="{name:'invoices'}">
                                    <div class="swiper-slide text-center" role="group" aria-label="4 / 10">
                                        <div class="card shadow-sm mb-2">
                                            <div class="card-body">
                                                <div class="h2 mb-0">
                                                    <i class="bi bi-pen"></i>
                                                </div>
                                        <p class="small">پسوڵەکان</p>
                                            </div>
                                        </div>
                                    </div>
                                        </router-link>
                                    <div class="swiper-slide text-center" role="group" aria-label="5 / 10">
                                        <div class="card shadow-sm mb-2">
                                            <div class="card-body">
                                                <div class="h2 mb-0">
                                                    <i class="bi bi-house"></i>
                                                </div>
                                        <p class="small">Decore</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                        </div>
                    </div>
                </div>
            </div>


    </main>
<AppToast/>
<Footer/>
</template>

<script setup>
import AppToast from "@/layouts/AppToast.vue";
import Footer from "@/layouts/Footer.vue";

</script>
<style>
.card{
    margin: 10px;
    background-color: rgb(86, 131, 245);
    color: white;
}
</style>