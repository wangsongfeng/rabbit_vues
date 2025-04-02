<template>
    <div class="cart">
        <a class="curr" href="javascript:;">
            <i class="iconfont icon-cart">
                <em>8</em>
            </i>
        </a>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

.cart {
    width: 50px;
    position: relative;
    z-index: 600;

    .curr {
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;
        display: block;

        .icon-cart {
            font-size: 22px;
        }

        em {
            font-style: normal;
            position: absolute;
            right: 0;
            top: 0;
            padding: 1px 6px;
            line-height: 1;
            background: $helpColor;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            font-family: Arial;
        }
    }
}
</style>