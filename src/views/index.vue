<template>
    <div>
        index耶耶耶
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
// .text-emphasis {
/* stylelint-disable-next-line property-no-vendor-prefix */
// -webkit-text-emphasis-style: "❤";
// }
.fa-info {
    padding: 10px 0 0;
    text-align: center;
    h1 {
        margin: 10px auto 20px;
    }
}
.question {
    .answer {
        margin: 20px 0 0;
        padding-left: 20px;
        font-size: 14px;
        color: #aaa;
        li {
            margin-bottom: 10px;
            line-height: 1.5;
            &:last-child {
                margin-bottom: 0;
            }
        }
        span {
            color: #666;
            font-weight: bold;
        }
    }
}
.icon-box {
    padding: 20px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        color: #fff;
    }
    &-1 {
        color: #ffc069;
        &:hover {
            background-color: #ffc069;
        }
    }
    &-2 {
        color: #b37feb;
        &:hover {
            background-color: #b37feb;
        }
    }
    &-3 {
        color: #95de64;
        &:hover {
            background-color: #95de64;
        }
    }
    &-4 {
        color: #ff85c0;
        &:hover {
            background-color: #ff85c0;
        }
    }
    &-5 {
        color: #ff9c6e;
        &:hover {
            background-color: #ff9c6e;
        }
    }
    &-6 {
        color: #282c34;
        &:hover {
            background-color: #282c34;
        }
    }
    i {
        font-size: 24px;
    }
    .title {
        margin-top: 5px;
        font-size: 14px;
    }
}
.cube-card {
    :deep(.el-col) {
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-select {
            width: 120px;
        }
    }
    .today,
    .yesterday,
    .contrast {
        font-size: 24px;
        line-height: 30px;
    }
    .today {
        font-weight: bold;
        color: #9d8254;
    }
    .yesterday {
        color: #666;
    }
    .contrast::after {
        content: "%";
    }
    .sub-title {
        font-size: 12px;
        line-height: 18px;
        color: #98a4b0;
    }
}
</style>
