	.file	"test.c"
	.intel_syntax noprefix
	.def	___main;	.scl	2;	.type	32;	.endef
	.text
	.globl	_main
	.def	_main;	.scl	2;	.type	32;	.endef
_main:
LFB10:
	.cfi_startproc
	push	ebp
	.cfi_def_cfa_offset 8
	.cfi_offset 5, -8
	mov	ebp, esp
	.cfi_def_cfa_register 5
	and	esp, -16
	sub	esp, 32
	call	___main
	fld	DWORD PTR LC0
	fstp	DWORD PTR [esp+28]
	fld	DWORD PTR LC1
	fstp	DWORD PTR [esp+24]
	fld	DWORD PTR [esp+28]
	fadd	DWORD PTR [esp+24]
	fstp	DWORD PTR [esp+20]
	fld	DWORD PTR [esp+28]
	fdiv	DWORD PTR [esp+24]
	fstp	DWORD PTR [esp+16]
	fld	DWORD PTR [esp+28]
	fmul	DWORD PTR [esp+24]
	fstp	DWORD PTR [esp+12]
	mov	eax, 0
	leave
	.cfi_restore 5
	.cfi_def_cfa 4, 4
	ret
	.cfi_endproc
LFE10:
	.section .rdata,"dr"
	.align 4
LC0:
	.long	1084647014
	.align 4
LC1:
	.long	1080033280
	.ident	"GCC: (MinGW.org GCC-6.3.0-1) 6.3.0"
